import {useEffect} from "react";
import {useCookies} from "react-cookie";
import axios from "axios";


export const useAuth = () =>{

    const [cookies, setCookies] = useCookies(["AUTH_TOKEN"]);
    const token = cookies.AUTH_TOKEN;

    useEffect(()=>{
        console.log("lefutok")
        if (!cookies.AUTH_TOKEN){
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        }
        else{
            delete axios.defaults.headers.common["Authorization"];
        }

    },[cookies])


    return {
        token
    }
}