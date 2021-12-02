const express = require('express');
const http = require('http');
const app = express();
const PORT = 9000;
const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));
const server = http.createServer(app);
const io = require('socket.io')(server);

let counter = 0;


app.get('/', function (request, response) {
    response.send('Hello from server');
})

io.on('connection', (socket) => {
    counter++;
    console.log(counter + ' ->someone connected');

    socket.on('sendToAll', (message) =>{
        console.log('to all: '+message);
        io.emit("displayMessage", (message));
    });

    socket.on('sendToSelf', (message) =>{
        console.log('to self: '+message);
        socket.emit("displayMessage", (message));
    });
  
});

server.listen(PORT,() => { 
    console.log('listening on port ' + PORT);
})


