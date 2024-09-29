import axios from "axios";
import {BASE_API_URL} from "./globals.ts";


export const apiInstance = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        "Content-Type" : "application/json"
    },
    withCredentials:true

});

export const getApi = () =>{

    return apiInstance;

}