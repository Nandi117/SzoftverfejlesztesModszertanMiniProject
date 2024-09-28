
import BlogPost from "../models/blogPost";
import {Error} from "mongoose";


/***
 * Blog bejegyzések kezelése üzleti logika
 */
export const blogService = {

    /***
     * Összes aktív blogbejegyzés lekérdezése
     * @return Blogbejegyzés entitás lista
     */
    findActives: async () => {
        const blogs = await BlogPost.find({
            isActive:true
        });
        return blogs;
    },

    /***
     * Blogbjegyzése lekérdezése dokumentum azonosító alapján
     * @param id Dokumentum azonosító
     * @return Blogbejegyzés entitás
     */
    findById: async (id:string) =>{
        const blog = await BlogPost.findById(id);
        return blog;
    },


    /***
     * Blogbejegyzés létrehozása
     * @param newPostData Új blogbejegyzés adatai
     * @return Új blogbjegyzés entitás
     */
    post: async (newPostData:any) =>{
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
        const deletedPost = await BlogPost.findByIdAndUpdate(
            id,
            {
                isActive:false
            }
        )
        if (!deletedPost) throw new Error("Blog post not found!");
        return id;
    }



}



