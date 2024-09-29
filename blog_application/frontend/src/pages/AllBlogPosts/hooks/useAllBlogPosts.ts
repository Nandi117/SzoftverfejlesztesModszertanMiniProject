import {useCallback, useEffect, useState} from "react";
import {getApi} from "../../../config/api.ts";
import {useDispatch} from "react-redux";
import {setOwnPosts} from "../../../store/ownPosts/ownPostsSlice.ts";

export const useAllBlogPosts = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const [allPosts, setAllPosts] = useState<any[]>([]);

    const getOwnPosts = useCallback(async () => {
        try {
            const response = await getApi().get("blogs");
            setAllPosts(response.data); // Set the response data to allPosts state
            dispatch(setOwnPosts(response.data)); // Optionally dispatch to Redux store if needed
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        getOwnPosts();
    }, [getOwnPosts]);

    return {
        posts: allPosts, // Return allPosts instead of posts from Redux store
        loading,
    };
};