import {Schema, model} from "mongoose";
import {BaseEntity} from "./baseEntity";




interface BlogPost extends Document {
    title:string
    author:string,
    content?:string
    createdAt:Date,
    updatedAt:Date,
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
