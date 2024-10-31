import express from 'express';
import dotenv from 'dotenv';
import connectDB from './connectDB.js';
import router from './routes/routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();


const corsOptions = {
    origin: '*',
}

app.use(cors());
app.use(cookieParser());

const app = express();
app.use(express.json());



app.get('/', (req, res) => {
    res.send('hell from the server side!');
})

app.use(router);


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