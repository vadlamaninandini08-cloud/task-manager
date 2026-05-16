document.getElementById('signupBtn')?.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  if (!email || !password) {
    alert('Please enter email and password');
    return;
  }
  
  const res = await fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await res.json();
  if (res.ok) {
    alert('Account created! Now click Sign In.');
  } else {
    alert(data.error);
  }
});

document.getElementById('signinBtn')?.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  const res = await fetch('/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await res.json();
  if (res.ok) {
    alert('Login successful!');
    localStorage.setItem('userId', data.userId);
    window.location.href = '/index.html';
  } else {
    alert(data.error);
  }
});
