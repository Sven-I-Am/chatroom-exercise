const express = require('express');
const http = require('http');
const app = express();
const PORT = 9000;
const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));
const server = http.createServer(app);
const io = require('socket.io')(server);

const JokeAPI = require('sv443-joke-api');
JokeAPI.getJokes()
  .then((res) => res.json())
  .then((data) => {
    // console.log(data)
  })


let counter = 0;
let userArray = [];


app.get('/', function (request, response) {
    response.send('Hello from server');
})

io.on('connection', (socket) => {
    function updateUsers(){
        let activeUsers = [];
        userArray.forEach(user =>{
            activeUsers.push(user);
        })
        io.emit('activeUsers', activeUsers);
    }

    function kickUser(data){
         let checkID = userArray.findIndex(user => user.userName === data);
         let user = userArray[checkID];
         let userSocket = user.userSocket;
         io.to(userSocket).emit('kick');
    }

    counter++;
    console.log(counter + ' ->someone connected');

    socket.on('join', (newUser) => {
        userArray.push( new myUser(newUser, socket.id));
        console.table(userArray);
        updateUsers();
    });

    socket.on('disconnect', () =>
    {
        let checkID = userArray.findIndex(user => user.userSocket === socket.id)
        if (checkID >= 0) {
            userArray.splice(checkID, 1);
        }
        else {
            console.log('Elvis has left the building!');
        }
        counter--;
        updateUsers();
    })

    socket.on('sendToAll', (data) =>{
        let message = data.message;
        let command = undefined;
        let user = undefined;
        if (message.startsWith('/')){
            let array = message.split(' ');
            command = array[0];
            user = array[1];
            socket.emit('displayMessage', (data));
            switch (command) {
                case '/kick':
                    console.log(data.user + ' kicked ' + user);
                    kickUser(user);
                    break;
                default:
                    data.message = 'command unknown';
                    socket.emit('displayMessage', (data));
                    break;
            }
        } else {
            io.emit('displayMessage', (data));
        }

        
           
        
    });

    socket.on('sendToSelf', (data) =>{
        socket.emit('displayMessage', (data));
    });
  
});

server.listen(PORT,() => { 
    console.log('listening on port ' + PORT);
})

class myUser {
    constructor(user, socketId){
        this.userName = user.userName;
        this.userSocket = socketId;
    }
}
