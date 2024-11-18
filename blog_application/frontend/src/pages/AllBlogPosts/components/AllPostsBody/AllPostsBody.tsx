import {Box, Grid, GridItem, Spinner} from "@chakra-ui/react";
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

    return (<Grid templateColumns="repeat(4, 1fr)" gap={6} mt={5} width={"50%"}>
            {posts.map((item: AllPostsType) => (
                <GridItem key={item._id} width={"100%"}>
                    <AllPostItem data={item}/>
                </GridItem>
            ))}
        </Grid>


    );
};