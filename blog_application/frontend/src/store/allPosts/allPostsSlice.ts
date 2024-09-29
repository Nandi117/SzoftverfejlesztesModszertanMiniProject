import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {AllPostsType} from "../../pages/AllBlogPosts/@types/allPosts.type.ts";

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
        setAllPosts(state, {payload}: PayloadAction<AllPostsType[]>) {
            state.posts = [...payload];
        },

        deletePost(state, {payload}: PayloadAction<string>) {
            const filtered = state.posts.filter(x => x._id !== payload);
            state.posts = [...filtered];
        },
    }
});

export const {
    setAllPosts,
    deletePost
} = allPostsSlice.actions;
export const allPostsReducer = allPostsSlice.reducer;