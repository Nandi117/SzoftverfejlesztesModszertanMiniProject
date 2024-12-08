import express from "express";
import authMiddleware, {AuthenticatedRequest} from "../middlewares/requireAuth";
import {badRequest, Ok} from "../helpers/response.helper";
import {logger} from "../config/logger";
import {userService} from "../services/userService";


const router = express.Router();


router.get("/", authMiddleware, async (req:AuthenticatedRequest, res)=>{
   try{
        logger.debug("Get accounts in the API layer.");
        const accounts = await userService.findAccounts();
        Ok(res, accounts);
   }
   catch (e){
        badRequest(res, e);
   }
});


export default router;



