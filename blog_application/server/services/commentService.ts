import {logger} from "../config/logger";
import Comment from "../models/comment";
import {Error} from "mongoose";
import {IUser} from "../models/user";
import {activityService} from "./activityService";

const savedCommentAct = "You commented ";
const deletedCommentAct = "You deleted comment ";

/**
 * Kommentek üzleti logika (BLL)
 * Üzleti folyamatok kezelése, adatok fogadása és továbbítása
 */
export const commentService = {



    activityHandler:async (operationType:string, data:Comment, user:IUser) =>{
        let activity:any = {
            referredObjectType:"Comment"
        };
        logger.debug(data.creatorUserId);
        switch (operationType){
            case "del":
                activity.description = deletedCommentAct + ` ${data.content.slice(0,50)}`;
                activity.referredObjectId = data._id;
                activity.referredObjectCreatorId = data.creatorUserId;
                break;
            case "po":
                activity.description = savedCommentAct + ` ${data.content.slice(0,50)}`;
                activity.referredObjectContent = data.content.slice(0,50);
                activity.referredObjectId = data._id;
                activity.referredObjectCreatorId = data.creatorUserId
                break;
        }
        logger.debug(activity)
        await activityService.save(activity, user);
    },


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
        }).populate({
            path:"creatorUserId",
            select:"_id username"
        });
        logger.debug(`Comment list contains ${comments.length} elements.`);
        return comments;

    },

    /**
     * Komment hozzadaása egy meglévő blogbejegyzéshez
     * @param newCommentData Új komment adatai
     * @return Új komment dokumentum
     */
    post:async (newCommentData:any, user:IUser)=>{
        logger.debug(`Create new comment in the API layer. ${JSON.stringify(newCommentData)}`);

        const up = {...newCommentData, userId:user._id, creatorUserId: user._id};
        const newComment = new Comment({...up});
        const savedComment = await newComment.save();
        await savedComment.populate({
            path:"creatorUserId",
            select:"_id username"
        })
        await commentService.activityHandler("po", savedComment, user);
        return savedComment;
    },


    /**
     * Komment törlése egyedi azonosító alapján
     * @param id Komment egyedi azonosítója
     * @return Törölt komment egyedi azonosítója
     */
    delete:async (id:string, user:any)=>{
        logger.debug(`Delete comment in the API layer by unique identifier. id=${id}`);
        const deletedComment = await Comment.findByIdAndUpdate(
            id,
            {
                isActive:false
            }
        );

        if (!deletedComment) throw new Error("Blog post not found!");
        await commentService.activityHandler("del", deletedComment, user);
        return id;
    }


}