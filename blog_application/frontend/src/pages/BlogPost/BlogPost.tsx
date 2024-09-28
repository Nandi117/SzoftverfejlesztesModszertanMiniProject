import {useBlogPost} from "./hooks/useBlogPost.ts";
import {Alert, AlertDescription, AlertIcon, AlertTitle, Box, Flex, Heading, Spinner} from "@chakra-ui/react";
import {errorMessages} from "../../config/messages.ts";
import parse from "html-react-parser";

const BlogPost = () => {


    const {
        loading,
        error,
        post
    } = useBlogPost();

    if (loading) {
        return <>
            <Flex justifyContent={"center"}>
                <Spinner color={"teal.500"} size={"xl"} mt={10}/>
            </Flex>

        </>
    }

    if (error.isError) {
        return <>
            <Alert status={"error"} mx={"auto"} width={"50%"} rounded={"md"}>
                <AlertIcon/>
                <AlertTitle>{errorMessages.messageTitle}</AlertTitle>
                <AlertDescription>{errorMessages.messageDescription}</AlertDescription>
            </Alert>
        </>
    }


    return <>
        <Flex flexDirection={"column"} alignItems={"center"}>
            <Box width={""}>
                <Heading as={"h5"}>{post?.title}</Heading>
                <Box mt={5}>
                    {post?.content ? parse(post?.content || "") : null}
                </Box>
            </Box>

        </Flex>
    </>


}


export default BlogPost;