import {useCallback, useEffect, useState} from "react";
import {getApi} from "../../../config/api.ts";
import {useParams} from "react-router-dom";


export const useBlogPost = () =>{


    const {id} = useParams();
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>({
        isError: false,
        errorMessage:""
    });

    const getBlogPost = useCallback(async () =>{
        try{
            const response = await getApi().get(`blogs/${id}`);
            setPost(response.data);
        }
        catch (e){
            setError({
                isError:true,
                errorMessage:"Something wrong happened!"
            })
        }
        finally {
            setLoading(false);
        }
    },[id]);



    useEffect(()=>{
        getBlogPost();
    },[]);

    return {
        post,
        loading,
        error
    }

}