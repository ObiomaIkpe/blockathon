import express from 'express';
import { createServer} from 'node:http';
import {Server} from 'socket.io';
import cors from 'cors';
const {userJoin, getUsers, userLeave}  = require("./utils/user")

const app = express();

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // Allow any URL
        methods: ["GET", "POST"],
    }
});


import dotenv from 'dotenv';
import connectDB from './connectDB.js';
import router from './routes/routes.js';
import cookieParser from 'cookie-parser';

app.use(express.json());
app.use(cookieParser());
app.use(cors())


let imageUrl, userResponse;

io.on('connection', (socket) => {
  console.log("a user connected"); 

  socket.on('draw', (data, callback) => {

    callback(data)
    // socket.emit('drawResponse', data)
    })

    socket.on("user-joined", (data) => {
        const {roomId, userId, userName, host, presenter} = data;
        userRoom = roomId;
        const user = userJoin(socket.id, userName, roomId, host, presenter);
        const roomUser = getUsers(user.room);
        socket.join(user.room);
        socket.emit("message", {
            message: "Welcome to ChatRoom"
        });
        socket.broadcast.to(user.room).emit("message", {
            message: `${user,username} has joined`
        });

        io.to(user.room).emit("users", roomUsers);
        io.to(user.room).emit("canvasImage",imageUrl);
    });

    socket.on("disconnect", ()=>{
        const userLeaves = userLeave(socket.id);
        const roomUsers = getUsers(userRoom);

        if (userLeaves){
            io.to(userLeaves.room).emit("message", {
                message: `${userLeaves.username} left the chat`,
            });
            io.to(userLeaves.room).emit("users", roomUsers);
        }
    });

    // broadcast  drawing start to other clients
    socket.on('startDraw', (data) => {
        socket.broadcast.emit('startDraw', data);
    });

    // Broadcast drawing in progress to other clients
    socket.on('draw', (data) => {
        socket.broadcast.emit('draw', data);
    });

    // Broadcast drawing end to other clients
    socket.on('endDraw', () => {
        socket.broadcast.emit('endDraw');
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
  })


dotenv.config();







app.get('/', (req, res) => {
    res.send('hell from the server side!');
})

app.use(router);
// app.use('/canvas', socketListener);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message ||  'internal server error';
    console.log(err);
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

const port = process.env.port || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        server.listen(`${port}`, () => {
            console.log(`hell from the server side`)
        });
    } catch (error) {
        console.log(error)
    }
}

start();