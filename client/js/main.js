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

chatScreen.style.display = 'none';


let user = {
    userName: undefined,
    password: undefined
}

/*joke api*/

let input = 'https://v2.jokeapi.dev/joke/Any';
async function getJOKE (){
    let api = await fetch(input);
    let jokesArray = await api.json();
}

/*start eventListeners*/

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

sendToSelf.addEventListener('click', () => {
    let sender = user.userName;
    let message = messageInput.value;
    socket.emit('sendToSelf', new Post(sender, message));
    messageInput.value = '';
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