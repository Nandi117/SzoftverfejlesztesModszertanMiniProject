import {useCallback, useState} from "react";
import {getApi} from "../../../config/api.ts";


export const useActivities = () =>{

    const [activities, setActivities] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getActivities = useCallback(async ()=>{
        setLoading(true)
        try{
            const response = await getApi().get("/activities");
            setActivities(response.data)
        }
        catch (e){
            console.log(e)
        }
        finally {
            setLoading(false);
        }

    },[]);

    return {
        getActivities,
        loading,
        activities,
        setActivities
    }
}