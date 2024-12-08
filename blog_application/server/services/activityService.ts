import {Error} from "mongoose";
import {logger} from "../config/logger";
import {IUser} from "../models/user";
import Activity from "../models/activity";


/***
 * Tevékenység üzleti logika
 */
export const activityService = {


    findActivesByUser:async (user:IUser | undefined, dateRange:any)=>{

        if (!user) throw new Error("User is not authenticated.")
        logger.debug(`Get activites in the BLL layer. dataRange=${dateRange} userId=${user.username}`);
        const activities = await Activity.find({
            creatorUserId:user._id,
        }).populate({
            path:"referredObjectCreatorId",
            select:"username image"
        }).sort({createdAt:-1});


        logger.debug(`Activities count: ${activities.length}`);
        return activities;
    },


    save:async (data:any, user:any)=>{
        const newActivity = new Activity({...data, creatorUserId:user._id});
        await newActivity.save();
    },


    hide:async (activityId:string | undefined) =>{
        if (!activityId)
            throw new Error("Activity id not provided.");
        const hiddenActivity = await Activity.findByIdAndUpdate(activityId, {
            isActive:false
        });

        if (!hiddenActivity)
            throw new Error("Activity not found.");

        return hiddenActivity._id;
    }

}



