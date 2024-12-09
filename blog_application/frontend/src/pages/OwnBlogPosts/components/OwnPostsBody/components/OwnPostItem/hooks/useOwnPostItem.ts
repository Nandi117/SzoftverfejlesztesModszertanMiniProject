import {useCallback, useState} from "react";
import {getApi} from "../../../../../../../config/api.ts";
import {useDispatch} from "react-redux";
import {deletePost} from "../../../../../../../store/ownPosts/ownPostsSlice.ts";
import {useToast} from "@chakra-ui/react";


export const useOwnPostItem = () =>{
    const toast = useToast();
    const [delInProgress, setDelInProgress] = useState<boolean>(false);
    const dispacth = useDispatch();

    const deleteOwnPost = useCallback(async (id:string) =>{
        setDelInProgress(true);
        try{
            const response = await getApi().delete(`blogs/${id}`);
            if (response.status === 200){
                const deletedPostId = response.data;
                dispacth(deletePost(deletedPostId));
                toast({
                    title: "Action completed.",
                    description: "Post successfully deleted.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position:"bottom-right"
                })
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
        delInProgress
    }
}