import mongoose from 'mongoose';

const connectDB = (URL) => {
    try {
        console.log('connected to DB')
        return mongoose.connect(URL)
    } catch (err) {
        console.log(err)
    }
}

export default connectDB;