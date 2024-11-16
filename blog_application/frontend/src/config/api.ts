import axios from "axios";
import {BASE_API_URL, TRANSLATOR_API_URL} from "./globals.ts";


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



const translatorApiInstance = axios.create({
    baseURL:TRANSLATOR_API_URL,
    headers:{
        "Content-Type" : "application/json"
    }
})

export const getTranslatorApi = () =>{
    return translatorApiInstance;
}