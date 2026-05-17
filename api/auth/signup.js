import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGO_URI;

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'taskmanager',
      bufferCommands: false,
    }).then(mongoose => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  
  await dbConnect();
  
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
    
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User already exists' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
