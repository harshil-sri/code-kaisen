// importing modules

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// defining the server, using express and http both because express is bad at handling open connections, so we wrap it in http
const app = express();
app.use(cors()); 
const server = http.createServer(app);
const activeDomains = {};

// calling socket.io and defining cors again
const io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] }
});

io.on('connection', (socket) => {
    socket.on('join_domain', (roomName) => {
        socket.join(roomName);
        console.log(`User ${socket.id} entered domain: ${roomName}`);

        if (!activeDomains[roomName]) {
            activeDomains[roomName] = { player1HP: 100, player2HP: 100};
        }
        io.to(roomName).emit('health_update', activeDomains[roomName]);
    });
    socket.on('client_attack', (roomName) => {
        if (activeDomains[roomName]) {
            activeDomains[roomName].player2HP -=10;
            console.log(`💥 Attack fired in domain: ${roomName}. P2 HP: ${activeDomains[roomName].player2HP}`);
        }
        io.to(roomName).emit('health_update', activeDomains[roomName]);
    });
});
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`🎮 Game Master running on port ${PORT}`);
});