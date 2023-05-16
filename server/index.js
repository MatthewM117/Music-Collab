const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
app.use(cors());
app.use(express.static(process.cwd()+"../client/build/"))

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`)

    socket.on('join_room', (data) => {
        socket.join(data);
    });

    socket.on('update_grid', (data) => {
        socket.to(data.room).emit('receive_grid', data);
    });

    socket.on('update_bpm', (data) => {
        socket.to(data.room).emit('receive_bpm', data);
    });
});

app.get('/', (req,res) => {
    res.sendFile(process.cwd()+"../client/build/index.html");
});

server.listen(8080, () => {
    console.log("Server is running.");
});