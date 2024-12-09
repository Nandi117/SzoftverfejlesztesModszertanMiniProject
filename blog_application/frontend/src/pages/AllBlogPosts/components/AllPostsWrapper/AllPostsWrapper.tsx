import { Flex } from "@chakra-ui/react";
import { AllPostsHeader } from "../AllPostsHeader/AllPostsHeader.tsx";
import { AllPostsBody } from "../AllPostsBody/AllPostsBody.tsx";

/**
 * AllPostsWrapper Component
 *
 * This component serves as the container for the entire "All Posts" page, consisting of the header and the body sections. 
 * It renders the `AllPostsHeader` and `AllPostsBody` components, allowing users to search and view all blog posts.
 *
 * Features:
 * - Uses Chakra UI's `Flex` component to structure and style the layout.
 * - The header and body are vertically stacked in a column.
 * - Provides a responsive layout that aligns the content to the center of the page.
 *
 * Components:
 * 1. **AllPostsHeader**: A child component responsible for displaying the search bar and filtering posts.
 * 2. **AllPostsBody**: A child component responsible for rendering the list of blog posts, possibly after being filtered by the search query.
 *
 * Usage:
 * ```tsx
 * <AllPostsWrapper />
 * ```
 *
 * Notes:
 * - The `Flex` component from Chakra UI is used for layout, with `flexDirection` set to `"column"` to stack the header and body vertically.
 * - The `width` is set to `"100%"` to make the container responsive.
 * - The `mt={"5vh"}` adds vertical margin to position the content further down from the top of the screen.
 *
 * Dependencies:
 * - `@chakra-ui/react`: For the `Flex` component.
 * - `../AllPostsHeader/AllPostsHeader.tsx`: For the header section with the search bar.
 * - `../AllPostsBody/AllPostsBody.tsx`: For the body section that displays the list of posts.
 */


export const AllPostsWrapper = () => {
    return (
        <Flex flexDirection={"column"} align={"center"} width={"100%"} mt={"5vh"}>
            <AllPostsHeader />
            <AllPostsBody />
        </Flex>
    );
};