import {Button, Flex, FormControl, FormLabel, Heading, Input} from "@chakra-ui/react";
import ReactQuill from "react-quill";
import {CheckIcon} from "@chakra-ui/icons";
import {useNewBlogPost} from "./hooks/useNewBlogPost.ts";


const NewBlogPost = () => {


    const {
        saveNewPost,
        loading,
        titleRef,
        quillEditorRef,
        fileUploaderRef
    } = useNewBlogPost();

    return <>
        <Flex flexDirection={"column"} alignItems={"center"} mx={"auto"} width={"50%"}>

            <Heading as={"h5"}>New Post</Heading>
            <FormControl>
                <FormLabel>Cover image</FormLabel>
                <Input type={"file"} ref={fileUploaderRef}/>
                <FormLabel>Title</FormLabel>
                <Input type='text' ref={titleRef}/>
            </FormControl>

            <ReactQuill ref={quillEditorRef} theme="snow" style={{height:800, marginTop:"1em", width:"100%"}}/>
            <Button  isLoading={loading}  loadingText='Submitting' alignSelf={"end"} rightIcon={<CheckIcon/>} mt={20} colorScheme={"teal"} onClick={saveNewPost}>Save</Button>
        </Flex>

    </>

}


export default NewBlogPost;