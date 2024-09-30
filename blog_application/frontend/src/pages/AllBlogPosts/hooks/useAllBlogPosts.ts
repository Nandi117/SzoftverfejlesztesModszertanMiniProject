import {useCallback, useEffect, useState} from "react";
import {getApi} from "../../../config/api.ts";

export const useAllBlogPosts = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [allPosts, setAllPosts] = useState<any[]>([]);

    const getAllPosts = useCallback(async () => {
        try {
            const response = await getApi().get("blogs");
            setAllPosts(response.data); // Set the response data to allPosts state
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
        posts: allPosts, // Return allPosts instead of posts from Redux store
        loading,
    };
};