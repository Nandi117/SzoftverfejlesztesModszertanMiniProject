import {useEffect} from "react";
import {useCookies} from "react-cookie";

import {apiInstance, getApi} from "../config/api.ts";


export const useAuth = () =>{

    const [cookies, setCookies] = useCookies(["AUTH_TOKEN"]);
    const token = cookies.AUTH_TOKEN;

    useEffect(()=>{
        if (cookies.AUTH_TOKEN){
            apiInstance.defaults.headers["Authorization"] = "Bearer " + token;
        }

    },[cookies])


    return {
        token
    }
}