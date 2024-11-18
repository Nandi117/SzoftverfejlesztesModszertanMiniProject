import {Schema, model} from "mongoose";
import {BaseEntity} from "./baseEntity";




interface BlogPost extends Document {
    _id:string,
    title:string
    author:string,
    content?:string
    createdAt:Date,
    updatedAt:Date,
    creatorUserId:string
}

const BlogPostSchema = new Schema(
    Object.assign({}, BaseEntity, {
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:false
        },
        image:{
            type:String,
            required:false
        },
        backgroundTemplate:{
            type:String,
            required:false,
            default:"linear-gradient(135deg, #a2d9ff, #79c8ff, #4fb8ff, #1aa8ff)"
        }
    })
);

const BlogPost = model<BlogPost>("BlogPost", BlogPostSchema);
export default BlogPost;
