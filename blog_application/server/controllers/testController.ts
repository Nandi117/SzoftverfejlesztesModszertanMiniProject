import {Router} from "express";
import {badRequest, Ok} from "../helpers/response.helper";
import User from "../models/user";


const router = Router()


router.post("/userTest", async (req, res)=>{
    try{
        const newUserData = req.body;
        const newUser = new User({...newUserData});
        const savedUser = newUser.save();
        Ok(res, savedUser);
    }
    catch (error){
        badRequest(res, error);
    }
});


export default router;

