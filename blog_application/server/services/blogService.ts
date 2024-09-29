
import BlogPost from "../models/blogPost";
import {Error} from "mongoose";
import {logger} from "../config/logger";


/***
 * Blog bejegyzések kezelése üzleti logika
 */
export const blogService = {

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
    post: async (newPostData:any) =>{
        logger.debug(`Create post in the BLL layer: newPost=${JSON.stringify(newPostData)}`);

        const newPost = new BlogPost({...newPostData});
        const savedPost = await newPost.save();
        return savedPost;
    },

    /***
     * Blogbejegyzés módosítása
     * @param updatePostData Módosított bejegyzés adatai
     * @return Módosított blogbejegyzés entitás
     */
    put: async (updatePostData:any)=>{
        logger.debug(`Update post in the BLL layer: id=${updatePostData.id}`);

        const updatedPost = await BlogPost.findByIdAndUpdate(
            updatePostData.id,
            ...updatePostData,
            { new:true }
        );
        if (!updatedPost) throw new Error("Blog post not found!");
        return updatedPost;
    },


    /***
     * Blogbejegyzés törlése
     * @param id Blogbejegyzés egyedi azonosítója
     * @return Blogbjegyzés egyedi azonosítója
     */
    delete: async (id:string)=>{
        logger.debug(`Delete post in the BLL layer by unique identifier. id=${id}`);

        const deletedPost = await BlogPost.findByIdAndUpdate(
            id,
            {
                isActive:false
            }
        )
        if (!deletedPost) throw new Error("Blog post not found!");
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
    }

}



