import {useCallback, useEffect, useState} from "react";
import {getApi} from "../../../config/api.ts";
import {useDispatch} from "react-redux";
import {setOwnPosts} from "../../../store/ownPosts/ownPostsSlice.ts";

export const useOwnBlogPosts = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const [allPosts, setAllPosts] = useState<any[]>([]);

    const getOwnPosts = useCallback(async () => {
        try {
            const response = await getApi().get("blogs");
            setAllPosts(response.data); 
            dispatch(setOwnPosts(response.data)); 
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
        posts: allPosts, 
        loading,
    };
};