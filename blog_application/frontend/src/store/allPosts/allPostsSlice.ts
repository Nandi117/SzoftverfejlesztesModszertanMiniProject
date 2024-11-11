import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AllPostType } from "../../pages/AllBlogPosts/@types/allPost.type.ts";

type AllPostsState = {
    posts: AllPostType[],
}

const initialState: AllPostsState = {
    posts: []
}

const allPostsSlice = createSlice({
    name: 'allPosts',
    initialState,
    reducers: {
        setAllPosts(state, { payload }: PayloadAction<AllPostType[]>) {
            state.posts = [...payload];
        },

        deletePost(state, { payload }: PayloadAction<string>) {
            const filtered = state.posts.filter(x => x._id !== payload);
            state.posts = [...filtered];
        },

        superlikePost(state, { payload }: PayloadAction<string>) {
            const post = state.posts.find(x => x._id === payload);
            if (post) {
                post.superlikes = (post.superlikes || 0) + 1;
            }
        },
    }
});

export const {
    setAllPosts,
    deletePost,
    superlikePost
} = allPostsSlice.actions;
export const allPostsReducer = allPostsSlice.reducer;