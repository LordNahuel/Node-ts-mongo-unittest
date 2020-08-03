import logger from "../common/logger"; 
import User ,{IUser} from "../models/user.model";
import { createDeflate } from "zlib";

export const getByEmail = async (params: string) => {
    try {
        const user = await User.find({ email: params });
        
        if (!user || !user.length) return null;

        return user[0];   
    } catch (error) {
        logger.error("Cant execute the query", error);
        throw error; 
    }
}

export const create = (user: IUser) => {
    return user.save(); 
}

export const getAll = async () => {
    try {
        const users = User.find();

        if (!users) return null; 
        
        return users;  
    } catch(error) {
        logger.error("Cant execute the query", error);
        throw error;
    }
}
// TODO: terminar este metodo ya que no actualiza los datos, el controller está ok.
// investigar como utilizar el metodo findOneandUpdate. 
export const update = async (user: IUser) => {
    try {
        const { id } = user;
        await User.findOneAndUpdate({id}, user);
    } catch (error) {
        logger.error("Cant execute query", error);
        throw error; 
    } 
}