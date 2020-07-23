import { model, Schema, Document } from "mongoose"; 
import bcrypt from "bcrypt";

export interface IUser extends Document {
    id?: string,
    role?: string,
    email: string,
    password: string,
    comparePassword(password: string): Promise<boolean> 
}

const userSchema = new Schema({
    email: {
        type: String, 
        unique: true, 
        required: true, 
        lowercase: true, 
        trim: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    role: {
        type: String, 
        required: true, 
        enum: ["Admin", "User"], 
        default: "User"
    }
});

// Encript password before save user
userSchema.pre<IUser>('save', async function(next) {
    const user = this; 

    if (!user.isModified('password')) return next(); 

    // generate salt
    const salt = await bcrypt.genSalt(10);
    // generate hash 
    const hash = await bcrypt.hash(user.password, salt); 
    // save encripted password into user before save
    user.password = hash; 

    next();
});

// this method allow you compare the user password to validate credentials. 
userSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
} 

export default model<IUser>('User', userSchema);