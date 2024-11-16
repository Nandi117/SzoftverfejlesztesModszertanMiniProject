import {useCallback, useEffect, useState} from "react";
import {getApi, getTranslatorApi} from "../../../config/api.ts";
import {useParams} from "react-router-dom";
import {DefaultPostType} from "../../../@types/blogPost.type.ts";
import {TRANSLATOR_API_URL} from "../../../config/globals.ts";


export const useBlogPost = () =>{


    const {id} = useParams();
    const [post, setPost] = useState<DefaultPostType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [translate, setTranslate] = useState<boolean>(false);
    const [translatedText, setTranslatedText] = useState<string | null>(null);
    const [error, setError] = useState<any>({
        isError: false,
        errorMessage:""
    });

    const [translationError, setTranslationError] = useState<boolean>(false);


    const getBlogPost = useCallback(async () =>{
        try{
            const response = await getApi().get(`blogs/${id}`);
            setPost(response.data);
        }
        catch (e){
            setError({
                isError:true,
                errorMessage:"Something wrong happened!"
            });
        }
        finally {
            timoutLoading();
        }
    },[id]);

    const translateBlogPost = useCallback(async ()=>{
        setTranslate(true);
        setTranslationError(false);
        if (!post?.content) return;

        try{
            const response = await getTranslatorApi()
                .post(TRANSLATOR_API_URL + "/translate", JSON.stringify({text:post?.content}));
            const data = response.data
            setTranslatedText(data.translated_text);
        }
        catch (e){
            setTranslationError(true);
        }
        finally {
            setTranslate(false);
        }
    },[post?.content]);

    const timoutLoading = () => setTimeout(()=>setLoading(false), 1000)

    useEffect(()=>{
        getBlogPost();
    },[]);



    return {
        post,
        loading,
        error,
        translate,
        translatedText,
        translateBlogPost,
        translationError
    }

}