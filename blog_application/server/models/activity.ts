import {model, Schema} from "mongoose";
import {BaseEntity} from "./baseEntity";


interface Activity extends Document {
    description:string
    referredObjectId?:string,
    referredObjectContent?:string,
    referredObjectType:string
    createdAt:Date,
    referredObjectCreatorId:string
}




const ActivitySchema = new Schema(
    Object.assign({}, BaseEntity, {
        description:{
            type:String,
            required:true
        },
        referredObjectId:{
            type:String,
            required:false
        },
        referredObjectContent:{
            type:String,
            required:false,
            maxLength:50
        },
        referredObjectType:{
            type:String,
            required:false
        },
        referredObjectCreatorId:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,
        }
    })
);

const Activity = model<Activity>("Activity", ActivitySchema);
export default Activity;
