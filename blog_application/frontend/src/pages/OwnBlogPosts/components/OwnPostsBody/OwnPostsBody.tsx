import {Box, Grid, GridItem, Spinner} from "@chakra-ui/react";
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


    return <Grid templateColumns='repeat(5, 1fr)' gap={6} mt={5} width={"50%"}>
        {
            posts.map((item:OwnPostType) => {
                return <GridItem key={item._id} width={"100%"}>
                    <OwnPostItem data={item}/>
                </GridItem>
            })
        }
    </Grid>


}