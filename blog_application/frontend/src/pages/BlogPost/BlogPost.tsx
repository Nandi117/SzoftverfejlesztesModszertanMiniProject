import {useBlogPost} from "./hooks/useBlogPost.ts";
import {Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Flex, Heading, Spinner} from "@chakra-ui/react";
import {errorMessages} from "../../config/messages.ts";
import parse from "html-react-parser";
import {RepeatIcon} from "@chakra-ui/icons";

const BlogPost = () => {


    const {
        loading,
        error,
        post,
        translatedText,
        translate,
        translateBlogPost,
        translationError
    } = useBlogPost();

    if (loading) {
        return <>
            <Flex justifyContent={"center"}>
                <Spinner color={"teal.500"} size={"xl"} mt={10 }/>
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
        <Flex flexDirection={"column"} alignItems={"center"} mt={10}>
            <Flex flexDirection={"column"} alignItems={"center"}  width={"50%"}>

                <Button
                    leftIcon={<RepeatIcon/>}
                    isLoading={translate}
                    title={"Translate this post"}
                    alignSelf={"end"}
                    size={"sm"}
                    loadingText={"Translation..."}
                    onClick={translateBlogPost}
                    colorScheme={translationError ? "red" : "gray"}
                >
                    {translationError ? "Translation failed" : "Translate HU"}
                </Button>
                <Heading as={"h5"} alignSelf={"start"} mt={4}>{post?.title}</Heading>
                <Box mt={5}>
                    {post?.content ? parse(post?.content || "") : null}
                </Box>

                {
                    translatedText ? <Box mt={5} alignSelf={"start"} color={"red"}>
                        {translatedText}
                    </Box> : null
                }

            </Flex>

        </Flex>
    </>


}


export default BlogPost;