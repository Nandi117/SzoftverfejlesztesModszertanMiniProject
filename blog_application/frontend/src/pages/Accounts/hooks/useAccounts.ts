import {useCallback, useEffect, useState} from "react";
import {getApi} from "../../../config/api.ts";


export const useAccounts = () =>{


    const [accounts, setAccounts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getAccounts = useCallback(async ()=>{
        setLoading(true)
        try{
            const response = await getApi().get("accounts");
            setAccounts(response.data);
        }
        catch (e){
            console.error(e)
        }
        finally {
            setLoading(false);
        }
    },[]);


    useEffect(()=>{
        getAccounts();
    },[])

    return {
        loading,
        accounts
    }
}