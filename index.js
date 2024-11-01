import express from 'express';
import { createServer} from 'node:http';
import {Server} from 'socket.io';
import cors from 'cors';

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

io.on('connection', (socket) => {
  console.log("a user connected"); 

  socket.on('draw', (data) => {
    console.log('sdfdf',data)
  })

//   socket.on("connect_error", (err) => {
    
//   console.log(`connect_error due to ${err.message}`);
}); 
  



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