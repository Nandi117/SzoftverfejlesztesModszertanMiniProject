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
        }
    })
);

const BlogPost = model<BlogPost>("BlogPost", BlogPostSchema);
export default BlogPost;
