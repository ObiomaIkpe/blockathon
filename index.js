import express from 'express';
import { createServer} from 'node:http';
import {Server} from 'socket.io';
import cors from 'cors';
import {userJoin, getUsers, userLeave}  from "./utils/user.js"

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
dotenv.config();


let imageUrl, userResponse;

io.on('connection', (socket) => {
  console.log("a user connected"); 

    socket.on("user-joined", (data) => {
        socket.emit("message", {
            message: "welcome to canvas room"
        })
    
        io.emit("a new user joined", data);
    })

  socket.on('drawing', (data) => {
  imageUrl = data;
  socket.broadcast.emit("canvasImage", imageUrl)
    // callback(data)
    // socket.emit('drawResponse', data)
    });

    
    // broadcast  drawing start to other clients
//     socket.on('startDraw', (data) => {
//         socket.broadcast.emit('startDraw', data);
//     });

//     // Broadcast drawing in progress to other clients
//     socket.on('draw', (data) => {
//         socket.broadcast.emit('draw', data);
//     });

//     // Broadcast drawing end to other clients
//     socket.on('endDraw', () => {
//         socket.broadcast.emit('endDraw');
//     });

//     socket.on('disconnect', () => {
//         console.log('A user disconnected:', socket.id);
//     });
  })


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