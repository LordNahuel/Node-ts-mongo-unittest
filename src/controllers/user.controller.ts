import { Request, Response } from "express";
import User, { IUser } from "../models/user.model"; 
import logger from "../common/logger";
import status from "../config/constants"; 
import jwt from "jsonwebtoken";
import config from "../config/config";

export const signUp = async (req: Request, res: Response) => {
    try {
        // Verify that the user complete all fields. 
        if (!req.body.email || !req.body.password) return res.status(status.BAD_REQUEST).json({ messagge: "Please send your email and password" }); 

        // Verify that the user doesnt exist.
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(status.BAD_REQUEST).json({ messagge: "User already in use" });

        // if the user doesnt exist create a new user. 
        const newUser = new User(req.body);

        await newUser.save(); 

        res.status(status.OK).json(newUser);
    } catch (error) {
        logger.error("Cant create the user account ", error);
        throw error;
    }
}

export const login = async (req: Request, res: Response) => {
    try {
       // Verify that the user complete all fields. 
        if (!req.body.email || !req.body.password) return res.status(status.BAD_REQUEST).json({ messagge: "Please send your email and password" }); 
        
        const user = await User.findOne({ email: req.body.email }); 
        if (!user) return res.status(status.BAD_REQUEST).json({ messagge: "The user doesnt exist. Please check your email or password" });

        const isMatch = await user.comparePassword(req.body.password);
        
        if (isMatch) return res.header({ token: createToken(user) }).send(user);

        return res.status(status.BAD_REQUEST).json({ messagge: "Email or Password are incorrect" });
    } catch (error) {
        logger.error("Cant create the user account ", error);
    }
}

// create a token to validate user that expire on 12h. 
function createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtsecret, {
        expiresIn: '12h'
    } );
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const users = await User.find();

        if (!users) return res.status(status.OK).json({ message: "Doesn't have users saved" });
        
        res.json(users);
    } catch (error) {
        logger.error("Error getting all users", error);
        throw error; 
    }
}