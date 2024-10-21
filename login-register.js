// login-register.js

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log('Login form submitted');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            login: '1',
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Login successful') {
            window.location.href = 'dashboard.html';
        } else {
            alert(data.message);
        }
    });
});

document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    fetch('auth.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            register: '1',
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => alert(data.message));
});
