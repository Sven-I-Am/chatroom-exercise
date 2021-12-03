const express = require('express');
const http = require('http');
const app = express();
// const PORT = 9000;
const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));
const server = http.createServer(app);
const io = require('socket.io')(server);

let counter = 0;
let userArray = [{userName: 'admin', password: 'admin', online: false}];
let commands = [{command: '/commands', description: 'show all commands'}, {command: '/kick', description: 'kick "username"'}, {command: '/rick', description: '/rick "username"'}, {command: '/dm', description: 'dm "username" "message"'}];
let commandsArray = [];
commands.forEach(command => {
    commandsArray.push(command.command);
})

app.get('/', function (request, response) {
    response.send('Hello from server');
})

io.on('connection', (socket) => {
    function updateUsers(){
        let activeUsers = [];
        userArray.forEach(user =>{
            if (user.online){
                activeUsers.push(user);
            }
        })
        io.emit('activeUsers', activeUsers);
    }

    function kickUser(data){
         let checkID = userArray.findIndex(user => user.userName === data);
         let user = userArray[checkID];
         console.log(user);
         let userSocket = user.userSocket;
         io.to(userSocket).emit('kick');
    }

    counter++;
    console.log(counter + ' ->someone connected on socket ' + socket.id);

    socket.on('login', (data) => {
        let checkID = userArray.findIndex(user => user.userName === data.userName);
        if (checkID < 0){
            socket.emit('loginError', ('Username unknown'));
        }
        if (checkID >= 0){
            let user = userArray[checkID];
            if(user.password===data.password){
                let user = userArray[checkID];
                user.online = true;
                let sendData = user.userName;
                socket.emit('success', ('success'));
                io.emit('joinMessage', (sendData));
                console.table(userArray);
                updateUsers();
            } else {
                socket.emit('loginError', ('Wrong password, try again'));
            }
        }
        
    });

    socket.on('register', (data) => {
        let checkID = userArray.findIndex(user => user.userName === data.userName);
        if(checkID >= 0){
            socket.emit('loginError', ('Username is already taken'));
        } else {
            let userName = data.userName;
            let password = data.password;
            let user = new myUser(userName, password, socket.id);
            userArray.push( user );
            let sendData = user.userName;
            socket.emit('success', ('welcome: type /commands to see the available commands.'));
            io.emit('joinMessage', (sendData));
            console.table(userArray);
            updateUsers();
        }
    });

    socket.on('disconnect', () =>
    {
        let checkID = userArray.findIndex(user => user.userSocket === socket.id)
        if (checkID >= 0) {
            let user = userArray[checkID];
            user.online = false;
            let sendData = user.userName;
            io.emit('leaveMessage', (sendData));
            // userArray.splice(checkID, 1);
            
        }
        else {
            console.log('Elvis has left the building!');
        }
        counter--;
        updateUsers();
    })

    socket.on('sendToAll', (data) =>{
        let message = data.message;
        let array = message.split(' ');
        let command =  array[0];
        let user = undefined;

        if (commandsArray.includes(command)) {
            let receiver;
            let message;
            let checkID;
            switch (command) {
                case '/commands':
                    data.message = 'Available commands: </br>';
                    commands.forEach(command =>{
                        console.log(command);
                        data.message += command.command + ': ' + command.description + '</br>';
                    })
                    socket.emit('displayMessage', (data));
                    break;
                case '/kick':
                    user = array[1];
                    console.log(data.user + ' kicked ' + user);
                    kickUser(user);
                    break;
                case '/dm':
                    receiver = array[1];
                    message = array.slice(2);
                    data.message = message.join(' ');
                    checkID = userArray.findIndex(user => user.userName === receiver);
                    if(checkID >= 0){
                        receiver = userArray[checkID];
                        io.to(receiver.userSocket).emit('displayMessage', data);
                    }
                    break;
                case '/rick':
                    receiver = array[1];
                    checkID = userArray.findIndex(user => user.userName === receiver);
                    if(checkID >= 0){
                        receiver = userArray[checkID];
                        io.to(receiver.userSocket).emit('rickRoll');
                    }
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

server.listen(process.env.PORT,() => { 
    console.log('listening on port ' + process.env.PORT);
})

class myUser {
    constructor(userName, password, socketId){
        this.userName = userName;
        this.password = password;
        this.userSocket = socketId;
        this.online = true;
    }
}
