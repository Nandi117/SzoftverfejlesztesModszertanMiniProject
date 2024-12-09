import {useEffect} from "react";
import {useCookies} from "react-cookie";

import {apiInstance, getApi} from "../config/api.ts";

/**
 * Custom hook `useAuth` for managing authentication state using cookies.
 *
 * This hook leverages the `react-cookie` library to retrieve and manage the `AUTH_TOKEN` cookie.
 * It automatically sets the `Authorization` header in the `apiInstance` if a token is present.
 *
 * @returns {Object} - Contains the `token` (current authentication token) from the cookies.
 */
export const useAuth = () =>{

    const [cookies, setCookies] = useCookies(["AUTH_TOKEN"]);
    const token = cookies.AUTH_TOKEN;

    useEffect(()=>{
        console.log(token);
        if (cookies.AUTH_TOKEN){
            apiInstance.defaults.headers["Authorization"] = "Bearer " + token;
        }

    },[cookies])


    return {
        token
    }
}