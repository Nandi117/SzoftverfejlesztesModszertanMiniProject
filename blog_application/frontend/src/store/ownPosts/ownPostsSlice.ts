





import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {OwnPostType} from "../../pages/OwnBlogPosts/@types/ownPost.type.ts";


type OwnPostsState= {
    posts:OwnPostType[],

}


const initialState:OwnPostsState = {
    posts:[]
}

const ownPostsSlice = createSlice({
    name: 'ownPosts',
    initialState,
    reducers: {
        setOwnPosts(state, {payload}:PayloadAction<OwnPostType[]>){
            state.posts = [...payload];
        },

        deletePost(state, {payload}:PayloadAction<string>){
            const filtered = state.posts.filter(x=>x._id !== payload);
            state.posts = [...filtered];
        },

    }
});



export const {
    setOwnPosts,
    deletePost
} = ownPostsSlice.actions;
export const ownPostsReducer = ownPostsSlice.reducer;




