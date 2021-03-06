let socket = io.connect();

const joinScreen = document.getElementById('joinScreen');
const chatScreen = document.getElementById('chatScreen');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const sendToAll = document.getElementById('sendToAll');
const sendToSelf = document.getElementById('sendToSelf');
let target = document.getElementById('target');
let messageInput = document.getElementById('userMessage'); 
let displayUsers = document.getElementById('activeUsers');

/*check styles*/
chatScreen.style.display = 'none';
function checkStyles() {
    if(innerWidth < 1000){
        joinScreen.classList.remove('w-75');
        joinScreen.classList.add('vw-100');
        chatScreen.classList.remove('w-75');
        chatScreen.classList.add('vw-100');
        document.getElementById('showMessages').classList.add('w-100');
        document.getElementById('header').style.visibility = 'hidden';
        document.getElementById('footer').style.visibility = 'hidden';
        
        displayUsers.style.visibility = 'hidden';
    } else {
        joinScreen.classList.remove('vw-100');
        joinScreen.classList.add('w-75');
        chatScreen.classList.remove('vw-100');
        chatScreen.classList.add('w-75');
        document.getElementById('showMessages').classList.remove('w-100');
        document.getElementById('header').style.visibility = 'visible';
        document.getElementById('footer').style.visibility = 'visible';
        displayUsers.style.visibility = 'visible';
    }
}

checkStyles();

let user = {
    userName: undefined,
    password: undefined
}

/*start eventListeners*/

window.addEventListener('resize', checkStyles);

loginBtn.addEventListener('click', ()=>{
    user.userName = document.getElementById('userName').value;
    user.password = document.getElementById('password').value;
    console.log(user);
    socket.emit('login', user);
})

registerBtn.addEventListener('click', ()=>{
    user.userName = document.getElementById('userName').value;
    user.password = document.getElementById('password').value;
    console.log(user);
    socket.emit('register', user);
})

sendToAll.addEventListener('click', () =>{
    let sender = user.userName;
    let message = messageInput.value;
    socket.emit('sendToAll', new Post(sender, message));
    messageInput.value = '';
})

// sendToSelf.addEventListener('click', () => {
//     let sender = user.userName;
//     let message = messageInput.value;
//     socket.emit('sendToSelf', new Post(sender, message));
//     messageInput.value = '';
// })

messageInput.addEventListener('keyup', (e)=>{
    if(e.keyCode === 13){
        e.preventDefault;
        sendToAll.click();
    }
})

/*end eventListeners*/

/*start socket.on*/

socket.on('loginError', (message)=>{
    alert('Login Error: ' + message);
})

socket.on('success', (message)=>{
    joinScreen.classList.remove('d-flex');
    joinScreen.style.display = 'none';
    chatScreen.style.display = 'inline-block';
    target.innerHTML += '<div id="showMessage" class="w-100 border border-primary text-end px-1 my-1">' + message + '</div>';
})

socket.on('displayMessage', (data) => {
    target.innerHTML += '<div id="showMessage" class="w-100 border border-primary text-end px-1 my-1">' + data.user + ': ' + data.message + '</div>';
});

socket.on('activeUsers', (data) => {
    displayUsers.innerHTML = '';
    data.forEach(user =>{        
        displayUsers.innerHTML += '<li>'+user.userName+'</li>';
    })
})

socket.on('joinMessage', (user)=>{
    target.innerHTML += '<div id="showMessage" class="w-100 border border-success text-end px-1 my-1" >' + user + ' has joined</div>';
})

socket.on('leaveMessage', (user)=>{
    target.innerHTML += '<div id="showMessage" class="w-100 border border-danger text-end px-1 my-1">' + user + ' has left</div>';
})

socket.on('kick', () =>{
    location.reload();    
})

socket.on('rickRoll', () =>{
    open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    focus();
})

/*end socket.on*/

/*start classes*/

class Post {
    constructor(user, message) {
        this.user = user;
        this.message = message;
    }
}

/*end classes*/