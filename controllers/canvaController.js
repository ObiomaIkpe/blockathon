import jwt from 'jsonwebtoken';
import { errorHandler } from '../errorHandler.js';
import Canvas from '../models/canvasModel.js';

export const createCanvas = async (req, res, next) => {
    
    const token = req.cookies.access_token;

    if(!token){
        return next(errorHandler(401, 'unauthorized'));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return next(errorHandler(401, 'unauthorized access!'))
        }

        req.user = user;
    })

    const tokenID = token._id;

    const {canvasCode, NFTName, NFTDescription} = req.body;
    
    if (canvasCode === '' || !canvasCode ){
        return next(errorHandler(401, 'canvas must have a name'))
    }

    const newCanvas = new Canvas({
        canvasCode, NFTName, NFTDescription
    });

    try {
        const savedCanvas = await newCanvas.save();
        res.status(201).json({savedCanvas});
    } catch (error) {
        return next(errorHandler(400, 'bad request'))
    }
    
    
        // 
}
