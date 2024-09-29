import {useCallback, useState} from "react";
import {getApi} from "../../../../../../../config/api.ts";
import {useDispatch} from "react-redux";
import {deletePost} from "../../../../../../../store/ownPosts/ownPostsSlice.ts";


export const useOwnPostItem = () =>{

    const [delInProgress, setDelInProgress] = useState<boolean>(false);
    const dispacth = useDispatch();


    const viewPost = (id:string) => window.open(`posts/${id}`);

    const updateOwnPost = useCallback(()=>{

    },[]);

    const deleteOwnPost = useCallback(async (id:string) =>{
        setDelInProgress(true);
        try{
            const response = await getApi().delete(`blogs/${id}`);
            if (response.status === 200){
                const deletedPostId = response.data;
                dispacth(deletePost(deletedPostId));
            }
        }
        catch (e){

        }
        finally {
            setDelInProgress(false);
        }
    },[]);


    return {
        deleteOwnPost,
        updateOwnPost,
        viewPost,
        delInProgress
    }
}