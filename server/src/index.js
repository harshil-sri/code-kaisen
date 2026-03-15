// importing modules

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// defining the server, using express and http both because express is bad at handling open connections, so we wrap it in http
const app = express();
app.use(cors()); 
const server = http.createServer(app);

// calling socket.io and defining cors again
const io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }
});

io.on('connection', (socket) => {
    socket.on('join_domain', (roomName) => {
        socket.join(roomName);
        console.log(`User ${socket.id} entered domain: ${roomName}`);
    });
    socket.on('client_attack', (roomName) => {
        console.log(`💥 Attack fired in domain: ${roomName}`);
        
        io.to(roomName).emit('server_damage', "Attack landed! HP -10"); 
    });
});
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`🎮 Game Master running on port ${PORT}`);
});