import {useCallback, useEffect, useState} from "react";
import {getApi, getTranslatorApi} from "../../../config/api.ts";
import {useParams} from "react-router-dom";
import {DefaultPostType} from "../../../@types/blogPost.type.ts";
import {TRANSLATOR_API_URL} from "../../../config/globals.ts";

/**
 * Custom Hook: useBlogPost
 *
 * This custom hook is responsible for fetching a single blog post based on its ID, managing the loading state,
 * and providing functionality to translate the post's content using an external translation API.
 *
 * Features:
 * - Fetches a specific blog post by its ID from the API.
 * - Allows the translation of the post's content to another language using a translation API.
 * - Manages loading, translation, and error states.
 *
 * Returned Object:
 * - `post`: The fetched blog post object, or `null` if not yet fetched or an error occurred.
 * - `loading`: A boolean indicating whether the blog post is still being loaded.
 * - `error`: An object containing information about any error that occurred while fetching the blog post.
 * - `translate`: A boolean indicating whether the translation process is ongoing.
 * - `translatedText`: The translated content of the blog post, or `null` if not translated.
 * - `translateBlogPost`: A function to trigger the translation of the blog post content.
 * - `translationError`: A boolean indicating whether an error occurred during the translation process.
 *
 * Usage:
 * This hook is typically used in a component that displays a blog post and provides an option to translate the post.
 * Example:
 * ```tsx
 * const {
 *   post,
 *   loading,
 *   error,
 *   translate,
 *   translatedText,
 *   translateBlogPost,
 *   translationError
 * } = useBlogPost();
 * 
 * if (loading) {
 *   return <Spinner />;
 * }
 * 
 * return (
 *   <div>
 *     {post && <PostCard post={post} />}
 *     {translate && <Spinner />}
 *     <button onClick={translateBlogPost}>Translate</button>
 *     {translatedText && <div>{translatedText}</div>}
 *   </div>
 * );
 * ```
 *
 * Notes:
 * - The hook relies on `getApi()` for fetching the blog post and `getTranslatorApi()` for the translation.
 * - It uses the `useParams` hook from `react-router-dom` to get the `id` of the post from the URL.
 * - `timoutLoading` is used to simulate a delay for the loading state to ensure a smooth UX.
 * - The translation is only triggered if the post content exists.
 * - Errors are handled for both the blog post fetching and the translation process.
 *
 * Dependencies:
 * - `getApi`, `getTranslatorApi`: Functions that set up API requests for fetching and translating data.
 * - `TRANSLATOR_API_URL`: The base URL for the translation API, defined in the global configuration.
 */


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


    console.log(post)
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