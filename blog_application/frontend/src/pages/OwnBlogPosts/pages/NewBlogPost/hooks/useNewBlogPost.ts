import {useCallback, useRef, useState} from "react";
import ReactQuill from "react-quill";
import {useNavigate} from "react-router-dom";
import {getApi} from "../../../../../config/api.ts";
import {routes} from "../../../../../config/routes.ts";
import {gradients} from "../NewBlogPost.tsx";
import {useToast} from "@chakra-ui/react";


export const useNewBlogPost = () => {

    const toast = useToast();

    const [loading, setLoading] = useState<boolean>(false);
    const [backgroundTemplate, setBackroundTemplate] = useState("oceanBreeze")
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

        const titleValue = titleRef.current?.value;
        const contentValue = quillEditorRef.current?.value;



        const newBlogData = {
            title: titleValue,
            content: contentValue,
            image: "",
            backgroundTemplate: gradients.find((x:any)=>x.key === backgroundTemplate).value
        }


        try {
            const response = await getApi().post("blogs", JSON.stringify(newBlogData));
            if (response.status === 200) {
                navigate(routes.ownPosts.main);
                toast({
                    title: "Action completed.",
                    description: "Post successfully created.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position:"bottom-right"
                })
            }

        } catch (e) {
            setError({
                isError: true,
                errorMessage: e
            })
        } finally {
            setLoading(false)

        }

    }, [gradients, backgroundTemplate]);

    return {
        saveNewPost,
        loading,
        titleRef,
        quillEditorRef,
        error,
        fileUploaderRef,
        backgroundTemplate,
        setBackroundTemplate
    }

}