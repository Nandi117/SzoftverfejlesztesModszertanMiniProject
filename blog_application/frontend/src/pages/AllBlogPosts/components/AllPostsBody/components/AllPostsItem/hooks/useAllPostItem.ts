
import {useDispatch} from "react-redux";

export const useAllPostItem = () => {
    const dispatch = useDispatch();

    const viewPost = (id: string) => window.open(`posts/${id}`);





    return {
        viewPost,
    };
};