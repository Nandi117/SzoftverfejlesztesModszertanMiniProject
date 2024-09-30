import {useCallback, useRef, useState} from "react";
import ReactQuill from "react-quill";
import {useNavigate} from "react-router-dom";
import {convertFileToBase64, extractBase64Data} from "../../../../../utils/fileToBase64.ts";
import {getApi} from "../../../../../config/api.ts";
import {routes} from "../../../../../config/routes.ts";


export const useNewBlogPost = () => {


    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>({
        isError: false,
        errorMessage: ""
    });
    const titleRef = useRef<HTMLInputElement>(null);
    const quillEditorRef = useRef<ReactQuill>(null);
    const fileUploaderRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const saveNewPost = useCallback(async () => {
        setLoading(true);
        try {
            const titleValue = titleRef.current?.value;
            const contentValue = quillEditorRef.current?.value;
            const fileList = fileUploaderRef.current?.files;

            const newBlogData = {
                title:titleValue,
                content:contentValue,
                image:""
            }

            if (!fileList || fileList.length === 0){
                const response = await getApi().post("blogs", JSON.stringify(newBlogData));
                if (response.status === 200){
                    navigate(routes.ownPosts.main);
                }
            }



            if (fileList) {
                convertFileToBase64(fileList[0])
                    .then( async (base64String)=> {
                        const newBlogData = {
                            title:titleValue,
                            content:contentValue,
                            image:extractBase64Data(base64String)
                        }

                        const response = await getApi().post("blogs", JSON.stringify(newBlogData));
                        if (response.status === 200){
                            navigate(routes.ownPosts.main);
                        }
                    })
                    .catch(error => {
                        console.error('Hiba történt:', error);
                    });
            }




        } catch (e) {
            setError({
                isError: true,
                errorMessage: e
            })
        } finally {
            setLoading(false)

        }

    }, []);

    return {
        saveNewPost,
        loading,
        titleRef,
        quillEditorRef,
        error,
        fileUploaderRef
    }

}