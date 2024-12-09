import {Box, Flex, Grid, GridItem, Spinner} from "@chakra-ui/react";
import {OwnPostItem} from "./components/OwnPostItem/OwnPostItem.tsx";
import {useOwnBlogPosts} from "../../hooks/useOwnBlogPosts.ts";
import {OwnPostType} from "../../@types/ownPost.type.ts";



export const OwnPostsBody = () => {


    const {
        posts,
        loading
     } = useOwnBlogPosts();


    if (loading){
        return <Box mt={10}>
            <Spinner color={"teal.500"} size={"xl"} />
        </Box>
    }


    return <Flex flexDirection={"column"} gap={6} my={5} width={"30%"}>
        {
            posts.map((item:OwnPostType) => {
                return <OwnPostItem data={item}/>

            })
        }
    </Flex>


}