import {drawerReducer} from "./drawer/drawer.slice.ts";
import {configureStore} from "@reduxjs/toolkit";


export const store = configureStore({

    reducer:{
        drawer:drawerReducer
    },

});