let signupBtn = document.getElementById("signupBtn");
let signinBtn = document.getElementById("signinBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");
let message = document.getElementById("message");

signinBtn.onclick = function(){
    nameField.style.maxHeight = "0";
    nameField.style.padding = "0";
    title.innerHTML = "Sign In";
    signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
    message.innerHTML = "";
}

signupBtn.onclick = function(){
    nameField.style.maxHeight = "60px";
    nameField.style.padding = "18px 15px";
    title.innerHTML = "Sign Up";
    signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
    message.innerHTML = "";
}

// Basic form handling - we'll connect to backend Day 2
document.getElementById("authForm").addEventListener("submit", function(e){
    e.preventDefault();
    message.style.color = "green";
    message.innerHTML = "Backend coming Day 2! For now, UI works 🎉";
});

signupBtn.addEventListener("click", function(){
    message.style.color = "green";
    message.innerHTML = "Sign Up clicked! Backend coming Day 2";
});

signinBtn.addEventListener("click", function(){
    message.style.color = "green";
    message.innerHTML = "Sign In clicked! Backend coming Day 2";
});
// Sign Up 
document.getElementById('signup-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  
  const res = await fetch('/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await res.json();
  if (res.ok) {
    alert('Account created! Please sign in.');
    location.reload();
  } else {
    alert(data.error);
  }
});

// Sign In
document.getElementById('signin-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('signin-email').value;
  const password = document.getElementById('signin-password').value;
  
  const res = await fetch('/signin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await res.json();
  if (res.ok) {
    alert('Login successful!');
    localStorage.setItem('userId', data.userId);
    // redirect to your main app page
    window.location.href = '/dashboard.html';
  } else {
    alert(data.error);
  }
});
