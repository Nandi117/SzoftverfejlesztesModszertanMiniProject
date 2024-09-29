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
            require:true
        },
        author:{
          type:String,
          require:true
        },
        content:{
            type:String,
        }
    })
);

const BlogPost = model<BlogPost>("BlogPost", BlogPostSchema);
export default BlogPost;
