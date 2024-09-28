


import {Router} from "express";
import blogController from "./controllers/blogController";
import commentsController from "./controllers/commentsController";
import testController from "./controllers/testController";

const router = Router();


router.use("/blogs", blogController);
router.use("/blogs/comments", commentsController);
router.use("/test", testController)


export default router;