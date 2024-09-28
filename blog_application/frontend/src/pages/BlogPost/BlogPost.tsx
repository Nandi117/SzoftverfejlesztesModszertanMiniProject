import {useBlogPost} from "./hooks/useBlogPost.ts";
import {Box, Flex, Heading, Spinner} from "@chakra-ui/react";


const BlogPost = () => {


    const {
        loading,
        error,
        post
    } = useBlogPost();


    return <>
        <Flex flexDirection={"column"} alignItems={"center"}>
            {loading ? <Spinner color={"teal.500"} size={"xl"}/> :
                <Box>
                    <Heading as={"h5"}>{post?.title}</Heading>
                </Box>}
        </Flex>
    </>


}


export default BlogPost;