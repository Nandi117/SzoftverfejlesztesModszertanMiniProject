


import {Router} from "express";
import blogController from "./controllers/blogController";

const router = Router();


router.use("/blogs", blogController);


export default router;