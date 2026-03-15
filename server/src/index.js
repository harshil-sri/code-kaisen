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
    console.log(`🟢 User connected: ${socket.id}`);
    socket.on('client_ping', () => {
        console.log("⚡ INCOMING PING FROM FRONTEND!");
        io.emit('server_pong', "PONG! 🏓");
    });
});
const PORT = 3001;
server.listen(PORT, () => {
    console.log(`🎮 Game Master running on port ${PORT}`);
});