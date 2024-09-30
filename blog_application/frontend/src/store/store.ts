import {drawerReducer} from "./drawer/drawer.slice.ts";
import {configureStore} from "@reduxjs/toolkit";
import {ownPostsReducer} from "./ownPosts/ownPostsSlice.ts";
import {authReducer} from "./auth/auth.slice.ts";
import {allPostsReducer} from "./allPosts/allPostsSlice.ts";



/*Registration slices here */
export const store = configureStore({

    reducer:{
        drawer:drawerReducer,
        ownPosts:ownPostsReducer,
        auth:authReducer,
        allPosts:allPostsReducer
    },

});