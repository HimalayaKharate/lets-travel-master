let logOutBtn = document.querySelector('.log-out-btn');

let signInForm = document.querySelector('.sign-in-form');
let registerForm = document.querySelector('.register-form');

signInForm.addEventListener('submit', function(e){
    e.preventDefault();
    let email = document.getElementById('sign-in-email').value;
    let password = document.getElementById('sign-in-password').value;
    fetch('http://localhost:3000/user_login/login', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
        //JS understands that the two keys email and password have to be created as their values
        //JS'll set the values of the variable email and the variable password
    }).then((res) => {
        if(res.status === 400){
            throw new Error();
        }
        return res.json();
    }).then((data) =>{
        window.location.href = data.redirectURL; //redirectURL: '/admin' from users.js (routes)
    }).catch(() => alert('Wrong email or password!'));
})

registerForm.addEventListener('submit', function(e){
    e.preventDefault();
    let name = document.getElementById('register-name').value;
    let email = document.getElementById('register-email').value;
    let password = document.getElementById('register-password').value;
    let rePassword = document.getElementById('register-re-enter-password').value;
    if(password !== rePassword){
        return;
    }
    fetch('http://localhost:3000/user_login/register', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password})
    }).then((res) => res.text())
    .then((data) => alert(data));
    
})

logOutBtn.addEventListener('click', function(){
    document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    window.location.href = '/';
})