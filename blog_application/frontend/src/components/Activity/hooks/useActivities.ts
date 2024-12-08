import {useCallback, useMemo, useState} from "react";
import {getApi} from "../../../config/api.ts";
import {ActivityType} from "../@types/activity.type.ts";


export const useActivities = () =>{

    const [activities, setActivities] = useState<any>([]);
    const [filter, setFilter] = useState<string>("all");
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


    const filteredRecords = useMemo(() => {
        const now = new Date();
        return activities.filter((record:ActivityType) => {
            const createdDate = new Date(record.createdAt);
            switch (filter) {
                case "today":
                    return createdDate.toDateString() === now.toDateString();

                case "week":
                    const oneWeekAgo = new Date();
                    oneWeekAgo.setDate(now.getDate() - 7);
                    return createdDate >= oneWeekAgo;

                case "month":
                    const oneMonthAgo = new Date();
                    oneMonthAgo.setMonth(now.getMonth() - 1);
                    return createdDate >= oneMonthAgo;

                case "all":
                default:
                    return true;
            }
        });
    }, [activities, filter]);

    return {
        getActivities,
        loading,
        activities,
        setActivities,
        filteredRecords,
        setFilter
    }
}