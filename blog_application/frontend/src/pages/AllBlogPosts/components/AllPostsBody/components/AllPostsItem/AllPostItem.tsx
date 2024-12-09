import { memo } from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    IconButton,
    Spacer,
    Text,
} from "@chakra-ui/react";
import {StarIcon, ViewIcon} from "@chakra-ui/icons";
import {useDispatch} from "react-redux";
import {superlikePost} from "../../../../../../store/allPosts/allPostsSlice.ts";
import {AllPostsType} from "../../../../@types/allPosts.type.ts";
import {CommentsModal} from "./CommentsModal.tsx";
import parse from "html-react-parser";

type AllPostItemProps = {
    data: AllPostsType
}
/**
 * All Post Item Component
 *
 * This component represents an individual post item displayed in a card layout. It allows users to view the post, superlike it, and open the comments modal.
 *
 * Features:
 * - Displays the title and content of a post in a card layout.
 * - Allows users to superlike a post, increasing its superlike count.
 * - Parses and displays HTML content of the post.
 * - Includes a button to view the full post and a button to open the comments modal.
 *
 * Props:
 * - `data`: An object containing the post data (`AllPostsType`).
 *   - `title`: The title of the post.
 *   - `content`: The HTML content of the post.
 *   - `superlikes`: The number of superlikes for the post.
 *   - `_id`: The unique identifier of the post.
 *   - `backgroundTemplate`: The background style of the post card header.
 *
 * Methods:
 * 1. **handleSuperlike**:
 *    - Dispatches the `superlikePost` action to increment the superlikes count for the post.
 * 
 * Usage:
 * - The `AllPostItem` component can be used to display individual posts within a list or grid.
 *
 * Example:
 * ```tsx
 * <AllPostItem data={postData} />
 * ```
 * Where `postData` is an object of type `AllPostsType` representing a post.
 *
 * Notes:
 * - The content is parsed using the `html-react-parser` library to render HTML content properly.
 * - The component uses Chakra UI for layout and styling.
 * - The `superlikePost` action is dispatched from the Redux store to handle superlikes.
 * - The component is memoized to prevent unnecessary re-renders when the post data has not changed.
 * 
 * Dependencies:
 * - `@chakra-ui/react`: For UI components like buttons, cards, and text.
 * - `@chakra-ui/icons`: For icons used in the superlike and view buttons.
 * - `react-redux`: For managing and dispatching Redux actions.
 * - `html-react-parser`: For rendering HTML content safely within the post.
 * - `../../../../../../store/allPosts/allPostsSlice.ts`: Contains the `superlikePost` action.
 * - `../../../../@types/allPosts.type.ts`: Defines the `AllPostsType` for the post data structure.
 */

export const AllPostItem = memo(({ data }: AllPostItemProps) => {
    const dispatch = useDispatch();
    console.log(data)
    const handleSuperlike = () => {
        dispatch(superlikePost(data._id));
    };

    return (
        <Card variant={"elevated"} height={300} width={"100%"} boxShadow={"2px 3px 2px rgba(0,0,0,0.15)"}>
            <CardHeader background={data.backgroundTemplate} borderTopRadius={"0.5em"}>
                <Flex alignItems={"center"} >
                    <Heading as={"h5"} size='sm'>
                        {data.title}
                    </Heading>
                    <Spacer />
                    <Flex>
                        <IconButton
                            aria-label={"Post superlike button"}
                            size={"sm"}
                            icon={<StarIcon />}
                            colorScheme='yellow'
                            variant={"ghost"}
                            onClick={handleSuperlike} />
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody maxHeight={200} overflow={"hidden"}>
                <Text>{parse(data.content)}</Text>
            </CardBody>
            <CardFooter display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
                <Text>Superlikes: {data.superlikes || 0}</Text>
                <Button
                    aria-label={"View post button"}
                    leftIcon={<ViewIcon/>}
                    colorScheme={"teal"}
                    variant={"ghost"}
                    onClick={() => window.open(`posts/${data._id}`)}
                    size={"sm"}>View</Button>
                <CommentsModal postId={data._id}/>
            </CardFooter>
        </Card>
    );
});