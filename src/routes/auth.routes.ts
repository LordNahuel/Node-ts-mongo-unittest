import Router from "express";
import * as userController from "../controllers/user.controller"; 

const router = Router(); 

router.route('/signup')
    .post(userController.signUp);

router.route('/login') 
    .post(userController.login);

router.route('/getAll')
    .get(userController.getAll);

export default router; 