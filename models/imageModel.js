import mongoose from 'mongoose';

const imageCode = new mongoose.Schema({
        imageCode: {
            typeString
        }

}, {timestamps: true});

const Image = new mongoose.model('Image', imageCode);
export default Image;