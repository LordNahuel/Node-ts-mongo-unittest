import Router from "express";
import * as authController from "../controllers/auth.controller";
import * as userController from "../controllers/user.controller"; 

const router = Router(); 

router.route('/signup')
    .post(authController.signUp);

router.route('/login') 
    .post(authController.login);

export default router; 