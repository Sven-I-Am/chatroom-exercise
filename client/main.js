let socket = io.connect();

const loginScreen = document.getElementById('loginScreen');
const chatScreen = document.getElementById('chatScreen');
const loginBtn = document.getElementById('loginBtn')
chatScreen.style.display = 'none';
loginBtn.addEventListener('click', ()=>{
    loginScreen.style.display = 'none';
    chatScreen.style.display = 'inline-block';
})

const sendToAll = document.getElementById('sendToAll');
const sendToSelf = document.getElementById('sendToSelf');
let target = document.getElementById('target');
let message = document.getElementById('userMessage');

sendToAll.addEventListener('click', () =>{
    socket.emit('sendToAll', (message.value));
    message.value = "";
})

sendToSelf.addEventListener('click', () => {
    socket.emit('sendToSelf', (message.value));
    message.value = "";
})

socket.on('displayMessage', (message) => {
    target.innerHTML += '<div id="showMessage" class="w-100 border border-primary text-end px-1"><p>' + message + '</p></div>'
});

//  