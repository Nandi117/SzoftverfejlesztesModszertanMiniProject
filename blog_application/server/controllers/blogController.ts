import {Router} from "express";
import {badRequest, Ok} from "../helpers/response.helper";
import {blogService} from "../services/blogService";
import {logger} from "../config/logger";

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



router.get("/", async (req, res)=>{
    try{
        const blogs = await blogService.findActives()
        Ok(res, blogs);
    }
    catch (error){
        badRequest(res, error);
    }
});


router.get("/:id", async (req, res)=>{
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

router.post("/", async (req, res)=>{
    try{
        const data = req.body;
        console.log(data);
        const newBlog = await blogService.post(data);
        Ok(res, JSON.stringify(newBlog));
    }
    catch (error){
        badRequest(res, error);
    }
});


router.put("/", async (req, res)=>{
   try{
        const data = req.body;
        const updatedBlog = await blogService.put(data);
        Ok(res, updatedBlog);
   }
   catch (error){
       badRequest(res, error);
   }
});


router.delete("/:id", async (req, res)=>{
    try{
        const id = req.params.id;
        const deletedId = await blogService.delete(id);
        Ok(res, deletedId);
    }
    catch (error){
        badRequest(res, error);
    }
});


export default router;










