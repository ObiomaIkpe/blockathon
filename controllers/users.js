import User from "../models/userModel";


export const getUsers = async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        message: 'successful',
        users
    })

}

export const userJoin = async (req, res, next) => {

}

export const userLeave = async (req, res, next) => {

}