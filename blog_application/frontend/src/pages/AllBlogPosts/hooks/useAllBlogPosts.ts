import { useCallback, useEffect, useState } from "react";
import { getApi } from "../../../config/api.ts";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../../../store/allPosts/allPostsSlice.ts";

/**
 * Custom Hook: useAllBlogPosts
 *
 * This custom hook is responsible for fetching all blog posts from the API and managing their loading state.
 * It ensures the posts are available for use by components that need to display them, while also providing 
 * a loading state to handle the asynchronous nature of the data fetching.
 *
 * Features:
 * - Fetches all blog posts from the API upon component mount.
 * - Adds a default value of 0 for `superlikes` if it's missing in the response.
 * - Provides a loading state that is `true` while data is being fetched and `false` once the fetch is complete.
 *
 * Returned Object:
 * - `posts`: The list of all blog posts, potentially with updated `superlikes`.
 * - `loading`: A boolean indicating whether the posts are still being loaded.
 *
 * Usage:
 * This hook is typically used in components that need to display or interact with all blog posts.
 * Example:
 * ```tsx
 * const { posts, loading } = useAllBlogPosts();
 * 
 * if (loading) {
 *   return <Spinner />;
 * }
 * 
 * return (
 *   <div>
 *     {posts.map(post => <PostCard key={post._id} post={post} />)}
 *   </div>
 * );
 * ```
 *
 * Notes:
 * - The hook automatically triggers a fetch for all posts when the component first mounts (`useEffect`).
 * - It provides a safe default for `superlikes` by setting them to 0 if they are missing in any post data.
 * - It relies on `getApi()` to make the API call and on `setAllPosts` from Redux to manage the global state of posts.
 *
 * Dependencies:
 * - `getApi`: A function that sets up the API request to the backend.
 * - `useDispatch`, `useSelector`: From `react-redux` for interacting with the Redux store, although not directly used in this implementation.
 */


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