import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt"; 
import config from "../config/config"; 
import logger from "../common/logger"; 
import User from "../models/user.model"

const ops: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtsecret
}

export default new Strategy(ops, async(payload, done) => {
    try {
        const email = payload.email; 
        const user = User.findOne({email}); 

        if (user) {
            return done(null, user);
        }

    return done(null, null);
    } catch (error) {
        logger.error("Cant validate credentials ", error);       
    }
});