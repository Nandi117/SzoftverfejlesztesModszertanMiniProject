import BlogPost from "../models/blogPost";
import {Error} from "mongoose";
import {logger} from "../config/logger";
import {IUser} from "../models/user";
import {activityService} from "./activityService";


const savedBPAct = "You created";
const updatedBPAct = "You updated";
const deletedBPAct = "You deleted";

/***
 * Blog bejegyzések kezelése üzleti logika
 */
export const blogService = {

    activityHandler:async (operationType:string, data:BlogPost, user:IUser) =>{
        let activity:any = {
            referredObjectType:"BlogPost"
        };
        logger.debug(data.creatorUserId);
        switch (operationType){
            case "del":
                activity.description = deletedBPAct + ` ${data.title}`;
                activity.referredObjectId = data._id;
                activity.referredObjectCreatorId = data.creatorUserId;
                break;
            case "po":
                activity.description = savedBPAct + ` ${data.title}`;
                activity.referredObjectContent = data.content?.slice(0,50);
                activity.referredObjectId = data._id;
                activity.referredObjectCreatorId = data.creatorUserId
                break;
            case "pu":
                activity.description = updatedBPAct + ` ${data.title}`;
                activity.referredObjectContent = data.content?.slice(0,50);
                activity.referredObjectId = data._id;
                activity.referredObjectCreatorId = data.creatorUserId;
                break;
        }
        logger.debug(activity)
        await activityService.save(activity, user);
    },

    /***
     * Összes aktív blogbejegyzés lekérdezése
     * @return Blogbejegyzés entitás lista
     */
    findActivesByUser: async (user:IUser) => {
        logger.debug(`Find all posts in the BLL layer by unique identifier.`);
        const blogs = await BlogPost.find({
            isActive:true,
            creatorUserId:user._id
        });

        logger.debug(`Post list contains ${blogs.length} elements.`);
        return blogs;
    },

    /***
     * Összes aktív blogbejegyzés lekérdezése
     * @return Blogbejegyzés entitás lista
     */
    findActives: async () => {
        logger.debug(`Find all posts in the BLL layer by unique identifier.`);
        const blogs = await BlogPost.find({
            isActive:true
        });

        logger.debug(`Post list contains ${blogs.length} elements.`);
        return blogs;
    },

    /***
     * Blogbjegyzése lekérdezése dokumentum azonosító alapján
     * @param id Dokumentum azonosító
     * @return Blogbejegyzés entitás
     */
    findById: async (id:string) =>{
        logger.info(`Get post in the BLL layer by unique identifier. id=${id}`);
        const blog = await BlogPost.findOne({
            _id:id,
            isActive:true
        });
        if (!blog) throw new Error("Not found!");
        return blog;
    },


    /***
     * Blogbejegyzés létrehozása
     * @param newPostData Új blogbejegyzés adatai
     * @return Új blogbjegyzés entitás
     */
    post: async (newPostData:any, user:IUser | undefined) =>{
        logger.debug(`Create post in the BLL layer: newPost=${JSON.stringify(newPostData)}`);
        if (!user) throw new Error("User not authenticated.");

        const newPost = new BlogPost({...newPostData, creatorUserId:user._id});
        const savedPost = await newPost.save();

        await blogService.activityHandler("po", savedPost, user);
        return savedPost;
    },

    /***
     * Blogbejegyzés módosítása
     * @param updatePostData Módosított bejegyzés adatai
     * @return Módosított blogbejegyzés entitás
     */
    put: async (updatePostData:any, user:IUser | undefined)=>{
        logger.debug(`Update post in the BLL layer: id=${updatePostData._id}`);

        if (!user) throw new Error("User not authenticated.");
        const updatedPost = await BlogPost.findByIdAndUpdate(
            updatePostData._id,
            ...updatePostData,
            { new:true }
        );
        if (!updatedPost) throw new Error("Blog post not found!");

        await blogService.activityHandler("po", updatedPost, user);
        return updatedPost;
    },


    /***
     * Blogbejegyzés törlése
     * @param id Blogbejegyzés egyedi azonosítója
     * @return Blogbjegyzés egyedi azonosítója
     */
    delete: async (id:string, user:IUser | undefined)=>{
        logger.debug(`Delete post in the BLL layer by unique identifier. id=${id}`);

        if (!user) throw new Error("User not authenticated.");
        const deletedPost = await BlogPost.findByIdAndUpdate(
            id,
            {
                isActive:false
            }
        )
        if (!deletedPost) throw new Error("Blog post not found!");
        await blogService.activityHandler("del", deletedPost, user);
        return id;
    },

    /**
     * Blogbejegyzések keresése
     * @param searchExpression Keresési kifejezése
     * @return Találati lista
     */
    search:async (searchExpression:any) =>{

        logger.debug(`Search posts in the BLL layer. SearchExpression=${searchExpression}`);

        if (searchExpression === null) throw new Error("Search expression is null!");

        const posts = await BlogPost.find({
            title: {$regex: new RegExp(searchExpression)},
            isActive:true
        });

        logger.debug(`Hit post list count. ${posts.length} elements`);

        return posts;
    },


    searchByUser: async (searchExpression:any, user:IUser) =>{
        logger.debug(`Search posts in the BLL layer by user. SearchExpression=${searchExpression}, UserId=${user._id}`);

        if (searchExpression === null) throw new Error("Search expression is null!");

        const posts = await BlogPost.find({
            title: {$regex: new RegExp(searchExpression)},
            isActive:true,
            creatorUserId:user._id
        });

        logger.debug(`Hit post list count. ${posts.length} elements`);

        return posts;
    }

}



