import {useEffect} from "react";
import {useCookies} from "react-cookie";



export const useAuth = () =>{

    const [cookies, setCookies] = useCookies(["AUTH_TOKEN"]);


    useEffect(()=>{
        console.log(cookies);


    },[cookies])


}