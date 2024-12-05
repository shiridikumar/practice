const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');  // Import CORS middleware

const app = express();
const server = http.createServer(app);

// Use express CORS middleware to allow requests from React client
app.use(cors({
  origin: 'http://localhost:3002',  // React app's origin
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// Set up Socket.IO with CORS configuration
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3002',  // Allow connections from React app
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('message', (msg) => {
        console.log('Message from client:', msg);
        socket.emit('message', `Server received: ${msg}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
