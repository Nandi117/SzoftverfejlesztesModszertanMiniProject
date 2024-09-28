import {model, Schema} from "mongoose";

interface User extends Document {
    username:string,
    email:string,
    password_hash:string,
    profile_picture:string,
    bio:string,
    createdAt:Date,
    updatedAt:Date,
}



const UserSchema = new Schema(

    {
        email:{
            type:String,
            unique:true,
            required:true,
        },
        username:{
            type:String,
            unique:true,
            required:true,
            maxLength:50,
            minLength:8
        },
        password_hash: {
            type:String,
            maxLength:50,
            minLength:8
        },
        profile_picture:{
            type:String,
            required:false
        },
        bio:{
            type:String,
            required:false
        },
        updatedAt:{
            type:Date,
            default:Date.now
        },
        createdAt:{
            type:Date,
            default:Date.now
        },
        validTo:{
            type:Date,
            default:null
        },
        isActive:{
            type:Boolean,
            default:true
        },
    }
)
const User = model<User>("User", UserSchema);

export default User;