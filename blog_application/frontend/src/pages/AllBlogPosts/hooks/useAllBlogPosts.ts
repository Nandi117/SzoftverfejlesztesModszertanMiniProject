import {useCallback, useEffect, useState} from "react";
import {getApi} from "../../../config/api.ts";
import {useDispatch, useSelector} from "react-redux";
import {setAllPosts} from "../../../store/allPosts/allPostsSlice.ts";

export const useAllBlogPosts = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const posts = useSelector((state:any)=>state.allPosts.posts);
    const dispatch = useDispatch();

    const getAllPosts = useCallback(async () => {
        try {
            const response = await getApi().get("blogs");

            dispatch(setAllPosts(response.data)); // Set the response data to allPosts state
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    return {
        posts,
        loading,
    };
};