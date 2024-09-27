



import { createSlice } from '@reduxjs/toolkit'


type DrawerState = {
    opened:boolean
}


const initialState:DrawerState = {
    opened:false
}

const drawerSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        toggleDrawer(state){
            state.opened = !state.opened;
        },
        closeDrawer(state){
            state.opened = false;
        }
    }
});



export const {
    toggleDrawer,
    closeDrawer
} = drawerSlice.actions;
export const drawerReducer = drawerSlice.reducer;
