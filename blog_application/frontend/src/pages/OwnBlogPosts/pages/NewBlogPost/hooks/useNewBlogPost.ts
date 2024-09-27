import {useCallback, useRef, useState} from "react";
import ReactQuill from "react-quill";
import {useNavigate} from "react-router-dom";
import {routes} from "../../../../../config/routes.ts";


export const useNewBlogPost = () =>{


    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>({
        isError:false,
        errorMessage:""
    });
    const titleRef = useRef<HTMLInputElement>(null);
    const quillEditorRef = useRef<ReactQuill>(null);
    const navigate = useNavigate();

    const saveNewPost = useCallback(async ()=>{
        setLoading(true);
        try{
            const titleValue = titleRef.current?.value;
            const contentValue = quillEditorRef.current?.editor?.getText();


            const newBlogData = {
                title:titleValue,
                content:contentValue
            }
            const response = await fetch("http://localhost:5000/api/blogs/insert", {
                method:"POST",
                body:JSON.stringify(newBlogData)
            });

            if (response.status === 200){
                navigate(routes.ownPosts.main);
            }

        }
        catch (e){
            setError({
                isError:true,
                errorMessage:e
            })
        }
        finally {
            setLoading(false)

        }

    }, []);

    return {
        saveNewPost,
        loading,
        titleRef,
        quillEditorRef,
        error
    }

}