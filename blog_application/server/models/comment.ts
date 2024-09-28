import {Schema, model} from "mongoose";
import {BaseEntity} from "./baseEntity";




interface Comment extends Document{
    postId:string,
    userId:string,
    content:string

}

const CommentSchema = new Schema(
    Object.assign({}, BaseEntity, {
        postId:{
            type:Schema.Types.ObjectId,
            ref:"BlogPost",
            required:true
        },
        userId:{
          type:Schema.Types.ObjectId,
          ref:"User",
          required:true
        },
        content:{
            type:String,
            required:true,
            maxLength:500,
            minLength:1
        }
    })
)



const Comment = model<Comment>("Comment", CommentSchema);
export default Comment;