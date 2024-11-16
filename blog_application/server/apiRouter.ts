


import {Router} from "express";
import blogController from "./controllers/blogController";
import commentsController from "./controllers/commentsController";
import testController from "./controllers/testController";
import authRoutes from "./controllers/authController";
import activityController from "./controllers/activityController";

const router = Router();


router.use("/blogs", blogController);
router.use("/blogs/comments", commentsController);
router.use("/test", testController)
router.use("/auth", authRoutes)
router.use("/activities", activityController)

export default router;