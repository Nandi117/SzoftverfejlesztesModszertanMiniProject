import { useCallback, useEffect, useState } from "react";
import { getApi } from "../../../config/api.ts";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../../../store/allPosts/allPostsSlice.ts";

export const useAllBlogPosts = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [allPosts, setAllPosts] = useState<any[]>([]);

    const getAllPosts = useCallback(async () => {
        try {
            const response = await getApi().get("blogs");
            const postsWithSuperlikes = response.data.map((post: { superlikes: any; }) => ({
                ...post,
                superlikes: post.superlikes || 0
            }));
            setAllPosts(postsWithSuperlikes);
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
        posts: allPosts,
        loading,
    };
};