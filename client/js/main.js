let socket = io.connect();

const joinScreen = document.getElementById('joinScreen');
const chatScreen = document.getElementById('chatScreen');
const joinBtn = document.getElementById('joinBtn');
const sendToAll = document.getElementById('sendToAll');
const sendToSelf = document.getElementById('sendToSelf');
let target = document.getElementById('target');
let messageInput = document.getElementById('userMessage'); 
let displayUsers = document.getElementById('activeUsers');
let jokeBtns= document.getElementsByClassName('messBtn');

chatScreen.style.display = 'none';

let user = {
    userName: undefined
}

/*joke api*/

let input = 'https://v2.jokeapi.dev/joke/Any';
async function getJOKE (){
    let api = await fetch(input);
    let jokesArray = await api.json();
}

/*start eventListeners*/

joinBtn.addEventListener('click', ()=>{
    user.userName = document.getElementById('userName').value;
    socket.emit('join', user);
    joinScreen.style.display = 'none';
    chatScreen.style.display = 'inline-block';
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

socket.on('displayMessage', (data) => {
    target.innerHTML += '<div id="showMessage" class="w-100 border border-primary text-end px-1"><p>' + data.user + ': ' + data.message + '</p></div>'
});

socket.on('activeUsers', (data) => {
    displayUsers.innerHTML = '';
    data.forEach(user =>{        
        displayUsers.innerHTML += '<li>'+user.userName+'</li>';
    })
})

socket.on('kick', () =>{
    location.reload();    
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