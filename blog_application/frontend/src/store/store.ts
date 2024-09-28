import {drawerReducer} from "./drawer/drawer.slice.ts";
import {configureStore} from "@reduxjs/toolkit";
import {ownPostsReducer} from "./ownPosts/ownPostsSlice.ts";



/*Registration slices here */
export const store = configureStore({

    reducer:{
        drawer:drawerReducer,
        ownPosts:ownPostsReducer
    },

});