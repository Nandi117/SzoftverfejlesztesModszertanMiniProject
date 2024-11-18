import {useCallback, useState} from "react";
import {getApi} from "../../../config/api.ts";


export const useActivities = () =>{

    const [activities, setActivities] = useState<any>({
        unhidden:[],
        hidden:[]
    });
    const [loading, setLoading] = useState<boolean>(false);

    const getActivities = useCallback(async ()=>{
        setLoading(true)
        try{
            const response = await getApi().get("/activities");
            const hidden = response.data.filter((x:any)=>!x.isActive);
            const unhidden = response.data.filter((x:any)=>x.isActive);
            setActivities({
                unhidden:unhidden,
                hidden:hidden
            });
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
        activities
    }
}