import express from 'express';
import dotenv from 'dotenv';
import connectDB from './connectDB.js';
import router from './routes/routes.js'

dotenv.config();


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

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(3000, () => {
            console.log(`hell from the server side`)
        });
    } catch (error) {
        console.log(error)
    }
}

start();