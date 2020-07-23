import Router from "express";
import * as userController from "../controllers/user.controller"; 

const router = Router(); 

router.route('/signup')
    .get(userController.signUp);

router.route('/login') 
    .get(userController.login);

export default router; 