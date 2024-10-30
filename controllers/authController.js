import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../errorHandler.js';
import User from '../models/userModel.js';

export const login = async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password || email === '' || password === ''){
        next(errorHandler(404, 'not found'))
    }
        try {
           const validUser = await User.findOne({email});

            if(!validUser) {
                return next(errorHandler(404, 'User not found'));
            }
            const validPassword = bcryptjs.compareSync(password, validUser.password);

            if(!validPassword){
                return next(errorHandler(404, 'invalid credentials'))
            }
            
            const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
            
            res.status(200).cookie('access_token', token, {httpOnly:true}).json({validUser, token});

        } catch (error) {
            console.log(error)
            next(error);
        }
    
}

export const signUp = async (req, res, next) => {
    const {firstName, lastName, email, password, walletAddress} = req.body;

    const hashedPassword = bcryptjs.hashSync(password, 5);

    const newUser = new User({firstName, lastName, email, walletAddress, password:hashedPassword});

    try {
        await newUser.save()
        res.status(201).json({
            message: "success",
            newUser
        })
    } catch (error) {
        console.log(error);
        next(errorHandler(403, 'error'))
    }

}