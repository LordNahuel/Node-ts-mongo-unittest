import { Request, Response } from "express";
import User, { IUser } from "../models/user.model"; 
import logger from "../common/logger";
import status from "../config/constants"; 
import jwt from "jsonwebtoken";
import config from "../config/config";
import * as userService from "../services/userService";

export const signUp = async (req: Request, res: Response) => {
    try {
        // Verify that the user complete all fields. 
        if (!req.body.email || !req.body.password) return res.status(status.BAD_REQUEST).json({ messagge: "Please send your email and password" }); 

        // Verify that the user doesnt exist.
        const user = await userService.getByEmail(req.body.email);

        if (user) return res.status(status.BAD_REQUEST).json({ messagge: "User already in use" });
        
        // if the user doesnt exist create a new user. 
        const newUser = new User({
            email: req.body.email,
            password: req.body.password
        });

        const created = await userService.create(newUser);
        
        res.status(status.OK).json(created);
    } catch (error) {
        logger.error("Cant create the user account ", error);
        throw error;
    }
}

export const login = async (req: Request, res: Response) => {
    try {
       // Verify that the user complete all fields. 
        if (!req.body.email || !req.body.password) return res.status(status.BAD_REQUEST).json({ messagge: "Please send your email and password" }); 
        
        const user = await userService.getByEmail(req.body.email); 
    
        if (!user) return res.status(status.BAD_REQUEST).json({ messagge: "The user doesnt exist. Please check your email or password" });

        const isMatch = await user.comparePassword(req.body.password);
        
        if (isMatch) return res.header({ token: createToken(user) }).send(user);

        return res.status(status.BAD_REQUEST).json({ messagge: "Email or Password are incorrect" });
    } catch (error) {
        logger.error("Cant create the user account ", error);
    }
}

// create a token to validate user that expire on 12h. 
export const createToken = (user: IUser) => {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtsecret, {
        expiresIn: '12h'
    } );
}

// testing module
const roles: Array<string> = [];

export const setRoles = function(role: Array<string>) {
    for (const iterator of role) {
        roles.push(iterator);
    }
}

export const deleteRoles = function() { 
    if (roles.length > 0) {
        roles.length = 0;
    }
}

export const isAuthorized = (neededRoles: string) => {
    return roles.indexOf(neededRoles) >= 0; 
}

export const isAuthorizedAsync = function(neededRoles: string, cb: CallableFunction) {
    setTimeout(function () { cb(roles.indexOf(neededRoles) >= 0)}, 2100);
}