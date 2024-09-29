import { useCallback, useState } from "react";
import { getApi } from "../../../../../../../config/api.ts";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../../../../../store/allPosts/allPostsSlice.ts";

export const useAllPostItem = () => {
    const [delInProgress, setDelInProgress] = useState<boolean>(false);
    const dispatch = useDispatch();

    const viewPost = (id: string) => window.open(`posts/${id}`);

    const updateAllPost = useCallback(() => {
        // Implement update logic here
    }, []);

    const deleteAllPost = useCallback(async (id: string) => {
        setDelInProgress(true);
        try {
            const response = await getApi().delete(`blogs/${id}`);
            if (response.status === 200) {
                const deletedPostId = response.data;
                dispatch(deletePost(deletedPostId));
            }
        } catch (e) {
            // Handle error
        } finally {
            setDelInProgress(false);
        }
    }, [dispatch]);

    return {
        deleteAllPost,
        updateAllPost,
        viewPost,
        delInProgress,
    };
};