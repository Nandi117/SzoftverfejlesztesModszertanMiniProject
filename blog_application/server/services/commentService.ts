import {logger} from "../config/logger";
import Comment from "../models/comment";
import {Error} from "mongoose";

/**
 * Kommentek üzleti logika (BLL)
 * Üzleti folyamatok kezelése, adatok fogadása és továbbítása
 */
export const commentService = {

    /**
     * Adott blogbejegyzésekhez tartozó kommentek lekérdezése
     * blogbejegyzés egyedi azonosítója alapján
     * @param postId Blogbjegyzés egyedi azonosítója
     * @return Adott blogbelegyzésehez tartozó kommentek
     */
    findByPostId:async (postId:string | null | undefined)=>{
        logger.debug(`Find all comments in the API layer by post unique identifier. postId=${postId}`);

        if (!postId) throw new Error("Post id is null!");

        const comments = await Comment.find({
            postId:postId,
            isActive:true
        }).populate("creatorUserId");
        logger.debug(`Comment list contains ${comments.length} elements.`);
        return comments;

    },

    /**
     * Komment hozzadaása egy meglévő blogbejegyzéshez
     * @param newCommentData Új komment adatai
     * @return Új komment dokumentum
     */
    post:async (newCommentData:any)=>{
        logger.debug(`Create new comment in the API layer. ${JSON.stringify(newCommentData)}`);
        const up = {...newCommentData, creatorUserId: "66f829769ad9b61ef387493c"};
        const newComment = new Comment({...up});
        const savedComment = await newComment.save();
        return savedComment;
    },


    /**
     * Komment törlése egyedi azonosító alapján
     * @param id Komment egyedi azonosítója
     * @return Törölt komment egyedi azonosítója
     */
    delete:async (id:string)=>{
        logger.debug(`Delete comment in the API layer by unique identifier. id=${id}`);
        const deletedComment = await Comment.findByIdAndUpdate(
            id,
            {
                isActive:false
            }
        )
        if (!deletedComment) throw new Error("Blog post not found!");
        return id;
    }


}