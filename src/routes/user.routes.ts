import { Router, Request, Response} from "express";
import * as userController from "../controllers/user.controller";

const router = Router(); 

router.route('/')
    .get(userController.getAll)
    .post(userController.create)

router.route('/:email')
    .get(userController.getByEmail)
    .put(userController.update) 
    
export default router;