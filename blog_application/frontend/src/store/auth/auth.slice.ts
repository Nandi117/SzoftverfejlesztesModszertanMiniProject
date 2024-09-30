





import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {UserType} from "../../@types/user.type.ts";


type AuthState = {
    user: UserType | null
}


const initialState:AuthState = {
    user: localStorage.getItem("UserInfo") ? JSON.parse(localStorage.getItem("UserInfo") || "") as UserType : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, {payload}:PayloadAction<UserType | null>){
            localStorage.setItem("UserInfo", JSON.stringify(payload));
        }
    }
});



export const {
    setUser
} = authSlice.actions;
export const authReducer = authSlice.reducer;


