





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

        updatePost(state, {payload}:PayloadAction<OwnPostType>){
            state.posts = state.posts.map((post)=>{
                if (post._id === payload._id){
                    return {...payload}
                }
                return post;
            });

        }

    }
});



export const {
    setOwnPosts,
    deletePost,
    updatePost
} = ownPostsSlice.actions;
export const ownPostsReducer = ownPostsSlice.reducer;




