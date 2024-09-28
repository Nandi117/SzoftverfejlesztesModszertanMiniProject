import {Router} from "express";
import {badRequest, Ok} from "../helpers/response.helper";
import {logger} from "../config/logger";
import {commentService} from "../services/commentService";

const router = Router();

router.get("/:postId", async (req, res)=>{
    try{
        const postId = req.params.postId
        logger.debug(`Find all comments in the API layer by post unique identifier. postId=${postId}`);
        const comments = await commentService.findByPostId(postId);
        Ok(res, comments);
    }
    catch (error){

    }
});

/**
 * Komment hozzadaása egy meglévő blogbejegyzéshez
 */
router.post("/", async (req, res)=>{
    try{
        const newCommentData = req.body;
        logger.debug(`Create new comment in the API layer. ${JSON.stringify(newCommentData)}`);
        const newComment = await commentService.post(newCommentData);
        Ok(res, JSON.stringify(newComment));
    }
    catch (error){
        badRequest(res, error);
    }
});

/**
 * Komment törlése egyedi azonosító alapján
 */
router.delete("/:id", async (req, res)=>{
    try{
        const id = req.params.id;
        logger.info(`Delete comment in the API layer by unique identifier. id=${id}`);

        const deletedCommentId = await commentService.delete(id);
        Ok(res, deletedCommentId);
    }
    catch (error){
        badRequest(res, error)
    }
});



export default router;



