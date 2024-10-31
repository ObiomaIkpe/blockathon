import mongoose from 'mongoose';

const canvasModel = new mongoose.Schema({
    NFTName: {
        type: String
    },
    NFTDescription: {
        type: String,
        minLenght: 6
    },
    canvasCode: {
        type: String
    }
}, {timestamps: true});

const Canvas = new mongoose.model('Canvas', canvasModel);
export default Canvas;