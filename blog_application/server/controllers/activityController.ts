import {Router} from "express";
import {logger} from "../config/logger";
import {badRequest, Ok} from "../helpers/response.helper";
import {activityService} from "../services/activityService";
import authMiddleware, {AuthenticatedRequest} from "../middlewares/requireAuth";


const router = Router();


router.get("/", authMiddleware, async (req:AuthenticatedRequest ,res)=>{
    try{
        //const searchExpression = req.query.searchExpression;
        logger.info(`Get activites in the API layer.`);
        const {user} = req;

        const activities = await activityService.findActivesByUser(user, "");
        Ok(res, activities);
    }
    catch (error){
        logger.error(error);
        badRequest(res, error);
    }
})


router.put("/hide", authMiddleware, async (req:AuthenticatedRequest, res)=>{
    try{
        const activityId:any =  req.query.activityId;
        logger.info(`Hide activity in the API layer. activityId=${activityId} `);

        const hiddenActivityId = await activityService.hide(activityId);
        Ok(res, hiddenActivityId);
    }
    catch (error){
        logger.error(error);
        badRequest(res, error);
    }
});

export default router;