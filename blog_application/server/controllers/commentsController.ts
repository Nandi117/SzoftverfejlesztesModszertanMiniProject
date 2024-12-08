import {Router} from "express";
import {badRequest, Ok} from "../helpers/response.helper";
import {logger} from "../config/logger";
import {commentService} from "../services/commentService";
import authMiddleware, {AuthenticatedRequest} from "../middlewares/requireAuth";

const router = Router();

/**
 * Kommentek lekérdezése poszt egyedi azonosítója alapján
 */
router.get("/:postId", authMiddleware, async (req:AuthenticatedRequest, res)=>{
    try{
        const postId = req.params.postId
        logger.debug(`Find all comments in the API layer by post unique identifier. postId=${postId}`);
        const comments = await commentService.findByPostId(postId);
        Ok(res, comments);
    }
    catch (error){
        badRequest(res, error);
    }
});

/**
 * Komment hozzadaása egy meglévő blogbejegyzéshez
 */
router.post("/", authMiddleware, async (req:AuthenticatedRequest, res)=>{
    try{
        const newCommentData = req.body;
        const {user} = req;
        logger.debug(`Create new comment in the API layer. ${JSON.stringify(newCommentData)}`);
        const newComment = await commentService.post(newCommentData, user!);
        Ok(res, JSON.stringify(newComment));
    }
    catch (error){
        badRequest(res, error);
    }
});

/**
 * Komment törlése egyedi azonosító alapján
 */
router.delete("/:id", authMiddleware, async (req:AuthenticatedRequest, res)=>{
    try{
        const id = req.params.id;
        const {user} = req;
        logger.info(`Delete comment in the API layer by unique identifier. id=${id}`);

        const deletedCommentId = await commentService.delete(id, user);
        Ok(res, deletedCommentId);
    }
    catch (error){
        badRequest(res, error)
    }
});



export default router;



