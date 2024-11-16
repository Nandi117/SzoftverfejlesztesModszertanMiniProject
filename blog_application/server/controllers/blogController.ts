import {Router} from "express";
import {badRequest, Ok} from "../helpers/response.helper";
import {blogService} from "../services/blogService";
import {logger} from "../config/logger";
import authMiddleware, {AuthenticatedRequest} from "../middlewares/requireAuth";

const router = Router();



router.get("/search", async (req, res)=>{
    try{
        const searchExpression = req.query.searchExpression;
        logger.info(`Search posts in the API layer. searchExpression=${searchExpression}`);

        const posts = await blogService.search(searchExpression);
        Ok(res, posts);
    }
    catch (error){
        badRequest(res, error);
    }
});

router.get("/own/search", authMiddleware, async (req:AuthenticatedRequest, res)=>{
    try{
        const searchExpression = req.query.searchExpression;
        const {user} = req;
        logger.info(`Search posts by user in the API layer. searchExpression=${searchExpression}`);

        const posts = await blogService.searchByUser(searchExpression, user!);
        Ok(res, posts);
    }
    catch (error){
        badRequest(res, error);
    }
});

router.get("/", async (req, res)=>{
    try{
        const blogs = await blogService.findActives()
        Ok(res, blogs);
    }
    catch (error){
        badRequest(res, error);
    }
});



router.get("/own", authMiddleware, async (req:AuthenticatedRequest, res)=>{
    try{
        const {user} = req;
        const blogs = await blogService.findActivesByUser(user!);
        Ok(res, blogs);
    }
    catch (error){
        badRequest(res, error);
    }
});




router.get("/:id", authMiddleware,  async (req, res)=>{
    try{

        const id = req.params.id;
        const blog = await blogService.findById(id);
        Ok(res, blog);
    }
    catch (error){
        console.log(error);
        badRequest(res, error);
    }
})

router.post("/", authMiddleware, async (req:AuthenticatedRequest, res)=>{
    try{
        const data = req.body;
        const {user} = req;
        const newBlog = await blogService.post(data, user!);
        Ok(res, JSON.stringify(newBlog));
    }
    catch (error){
        badRequest(res, error);
    }
});


router.put("/", authMiddleware, async (req:AuthenticatedRequest, res)=>{
   try{
        const data = req.body;
        const {user} = req;
        logger.debug(`Update blog post in the API layer. ModifiedData=${JSON.stringify(data)}`);
        const updatedBlog = await blogService.put(data, user);
        Ok(res, updatedBlog);
   }
   catch (error){
       badRequest(res, error);
   }
});


router.delete("/:id", authMiddleware, async (req:AuthenticatedRequest, res)=>{
    try{
        const id = req.params.id;
        const {user} = req;
        const deletedId = await blogService.delete(id, user);
        Ok(res, deletedId);
    }
    catch (error){
        badRequest(res, error);
    }
});


export default router;










