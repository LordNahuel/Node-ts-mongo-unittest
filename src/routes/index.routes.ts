import { Router, Request, Response} from "express";

const router = Router(); 

router.route('/')
    .get((req: Request, res: Response) => {
        res.json({ message: "Welcome to my API rest" });
    }); 

export default router;