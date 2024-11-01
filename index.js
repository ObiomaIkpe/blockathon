import express from 'express';
import { createServer} from 'node:http';
import cors from 'cors';

const app = express();

import {Server} from 'socket.io';
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    }
});

import dotenv from 'dotenv';
import connectDB from './connectDB.js';
import router from './routes/routes.js';
import cookieParser from 'cookie-parser';


io.on('connection', (socket) => {
  console.log("a user connected");  
  
//   socket.on('draw', (draw) => {
//     io.emit('draw', draw);
//   });
})


dotenv.config();





app.use(express.json());

app.use(cookieParser());
app.use(cors());


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
        app.listen(`${port}`, () => {
            console.log(`hell from the server side`)
        });
    } catch (error) {
        console.log(error)
    }
}

start();