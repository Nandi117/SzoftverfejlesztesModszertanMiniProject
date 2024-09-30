import {useCallback, useEffect, useState} from "react";
import {getApi} from "../../../config/api.ts";
import {useDispatch, useSelector} from "react-redux";
import {setOwnPosts} from "../../../store/ownPosts/ownPostsSlice.ts";
import {base64ToBlob} from "../../../utils/base64ToBlob.ts";
import {OwnPostType} from "../@types/ownPost.type.ts";


export const useOwnBlogPosts = () =>{


    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const posts = useSelector(state=>state.ownPosts.posts);

    const getOwnPosts = useCallback(async () =>{
        try{
            const response = await getApi().get("blogs/own");
            const mapped = response.data.map((post:OwnPostType)=>{
                console.log(post)
               return  {
                    ...post,
                    image:base64ToBlob(post.image)
                }
            })
            dispatch(setOwnPosts(mapped));


            console.log(mapped);
        }
        catch (e){
            console.log(e)
        }
        finally {
            setLoading(false);
        }
    },[]);


    useEffect(()=>{
        getOwnPosts();
    },[]);


    return {
        posts,
        loading,
    }

}