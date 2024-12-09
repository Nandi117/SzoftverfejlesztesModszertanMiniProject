import {Box, Flex, Spinner} from "@chakra-ui/react";
import {AllPostItem} from "./components/AllPostsItem/AllPostItem.tsx";
import {useAllBlogPosts} from "../../hooks/useAllBlogPosts.ts";
import {AllPostsType} from "../../@types/allPosts.type.ts";

/**
 * AllPostsBody Component
 *
 * This component is responsible for displaying a list of all blog posts. It fetches the data using a custom hook
 * and presents the posts in a responsive layout. If the data is still loading, a spinner is shown to indicate the loading state.
 *
 * Features:
 * - Displays a loading spinner while fetching posts.
 * - Renders a list of blog posts once they are successfully fetched.
 * - Organizes posts in a flexible column layout.
 *
 * State:
 * - `posts`: An array of `AllPostsType` objects representing all the blog posts fetched from the API.
 * - `loading`: A boolean flag indicating if the posts are being fetched.
 *
 * Methods:
 * 1. **useAllBlogPosts**: 
 *    - A custom hook used to fetch the list of blog posts from the backend.
 *    - Returns the `posts` and `loading` state.
 *
 * Components:
 * - **Spinner**: Displays a loading spinner when the posts are being fetched.
 * - **AllPostItem**: Renders individual post items for each post in the `posts` array.
 *
 * Usage:
 * ```tsx
 * <AllPostsBody />
 * ```
 *
 * Notes:
 * - The posts are displayed in a flex container that wraps and centers the items on the page.
 * - Each post is rendered inside an `AllPostItem` component, which is responsible for displaying individual post details.
 * - The `loading` state is handled by showing a spinner until the data is fully fetched.
 *
 * Dependencies:
 * - `@chakra-ui/react`: For Spinner, Box, and Flex components.
 * - `../../hooks/useAllBlogPosts.ts`: Custom hook for fetching the blog posts.
 * - `../../@types/allPosts.type.ts`: Defines the `AllPostsType` for post data structure.
 * - `./components/AllPostsItem/AllPostItem.tsx`: For rendering each individual blog post.
 */


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