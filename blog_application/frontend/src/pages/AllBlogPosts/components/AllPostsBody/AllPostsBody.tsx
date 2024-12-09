import {Box, Flex, Spinner} from "@chakra-ui/react";
import {AllPostItem} from "./components/AllPostsItem/AllPostItem.tsx";
import {useAllBlogPosts} from "../../hooks/useAllBlogPosts.ts";
import {AllPostsType} from "../../@types/allPosts.type.ts";

export const AllPostsBody = () => {
    const {posts, loading} = useAllBlogPosts();

    if (loading) {
        return (
            <Box mt={10}>
                <Spinner color={"teal.500"} size={"xl"}/>
            </Box>
        );
    }

    return (<Flex wrap={"wrap"} flexDirection={"column"} alignItems={"center"} gap={4} my={4} width={"30%"}>
            {posts.map((item: AllPostsType) => (

                <AllPostItem data={item}/>

            ))}
        </Flex>


    );
};