import { Request, Response } from "express";
import User, { IUser } from "../models/user.model"; 
import logger from "../common/logger";
import status from "../config/constants"; 
import * as userService from "../services/userService";
import { exit } from "process";

export const getAll = async (req: Request, res: Response) => {
    try {
        const users = await userService.getAll();

        if (!users) return res.status(status.OK).json({ message: "Doesn't have users saved" });
        
        res.json(users);
    } catch (error) {
        logger.error("Error getting all users", error);
        throw error; 
    }
}

export const getByEmail = async (req: Request, res: Response) => {
    try {
        if (!req.params.email) return res.send(status.INTERNAL_SERVER_ERROR).json({ message: "You must send an email" });
        
        const user = await userService.getByEmail(req.params.email);
        if (!user) return res.send(status.BAD_REQUEST).json({ message: "There aren't any users with these email"});
        
        res.status(status.OK).json(user);
    } catch (error) {
        logger.error("Error getting all users", error);
        throw error;
    }
}

export const create = async (req: Request, res: Response) => {
    try {
         // Verify that the user complete all fields. 
         if (!req.body.email || !req.body.password || !req.body.role) return res.status(status.BAD_REQUEST).json({ messagge: "You must complete all field" }); 

         // Verify that the user doesnt exist.
         const user = await userService.getByEmail(req.body.email);
 
         if (user) return res.status(status.BAD_REQUEST).json({ messagge: "User already in use" });
         
         // if the user doesnt exist create a new user. 
         const newUser = new User({
             email: req.body.email,
             password: req.body.password,
             role: req.body.role
         });
 
         const created = await userService.create(newUser);
         
         res.status(status.OK).json(created);
    } catch (error) {
        logger.error("Error creating user", error);
        throw error;        
    }
}

export const update = async(req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password || !req.body.role) return res.status(status.BAD_REQUEST).json({message: "You must complete all fields"});
        
        const umail = req.params.email; 
        const {email, password, role} = req.body;

        const exist = await userService.getByEmail(umail);
        if (!exist) return res.status(status.BAD_REQUEST).json({message: "The user doesn't exist"});

        const updated = new User({
            id: exist.id,
            email: email,
            password: password,
            role: role
        });

        await userService.update(updated);

        res.sendStatus(status.OK);
    } catch (error) {
        logger.error("Error updating user", error);
        throw error; 
    }
}
