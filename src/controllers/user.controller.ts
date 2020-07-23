import { Request, Response } from "express";
import User from "../models/user.model"; 
import logger from "../common/logger";
import status from "../config/constants"; 

export const signUp = async (req: Request, res: Response) => {
    try {
        // Verify that the user complete all fields. 
        if (!req.body.email || !req.body.password) return res.status(status.BAD_REQUEST).json({ messagge: "Please send your email and password" }); 

        // Verify that the user doesnt exist.
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(status.BAD_REQUEST).json({ messagge: "User already in use" });

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
        res.json({ messagge: "login method" });
    } catch (error) {
        logger.error("Cant create the user account ", error);
    }
}