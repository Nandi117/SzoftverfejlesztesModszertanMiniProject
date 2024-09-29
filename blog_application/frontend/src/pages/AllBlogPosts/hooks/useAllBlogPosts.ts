import {useCallback, useEffect, useState} from "react";
import {getApi} from "../../../config/api.ts";
import {useDispatch, useSelector} from "react-redux";
import {setAllPosts} from "../../../store/allPosts/allPostsSlice.ts";

export const useAllBlogPosts = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useDispatch();
    const posts = useSelector(state => state.allPosts.posts);

    const getAllPosts = useCallback(async () => {
        try {
            const response = await getApi().get("blogs");
            dispatch(setAllPosts(response.data));
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    return {
        posts,
        loading,
    };
};