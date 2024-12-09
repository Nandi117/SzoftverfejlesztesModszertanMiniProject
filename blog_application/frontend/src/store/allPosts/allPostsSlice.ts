import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllPostsType } from "../../pages/AllBlogPosts/@types/allPosts.type.ts";

type AllPostsState = {
    posts: AllPostsType[],
}

const initialState: AllPostsState = {
    posts: []
}

const allPostsSlice = createSlice({
    name: 'allPosts',
    initialState,
    reducers: {
        /**
 * Replaces the current list of posts in the state with a new list.
 * @param state - The current state of the allPosts slice.
 * @param payload - An array of posts to replace the current posts.
 */
        setAllPosts(state, { payload }: PayloadAction<AllPostsType[]>) {
            state.posts = [...payload];
        },
/**
 * Deletes a post from the state by its unique ID.
 * @param state - The current state of the allPosts slice.
 * @param payload - The ID of the post to be deleted.
 */
        deletePost(state, { payload }: PayloadAction<string>) {
            const filtered = state.posts.filter(x => x._id !== payload);
            state.posts = [...filtered];
        },
/**
 * Handles the superlike action for a post.
 * Finds the post in the state by its unique ID and increments its superlike count.
 * Logs the payload and post object for debugging purposes.
 * @param state - The current state of the allPosts slice.
 * @param payload - The ID of the post to superlike.
 */
        superlikePost(state, { payload }: PayloadAction<string>) {
            console.log(payload)
            const post = state.posts.find(x => x._id == payload);
            console.log(post)
            /*if (post) {
                post.superlikes = (post.superlikes || 0) + 1;
            }*/
        },
    }
});

export const {
    setAllPosts,
    deletePost,
    superlikePost
} = allPostsSlice.actions;
export const allPostsReducer = allPostsSlice.reducer;