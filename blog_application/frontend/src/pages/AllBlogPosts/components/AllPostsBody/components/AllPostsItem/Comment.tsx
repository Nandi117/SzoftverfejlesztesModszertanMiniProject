import {memo, useCallback} from "react";
import {CommentType} from "../../../../../../@types/comment.type.ts";
import {Avatar, Flex, IconButton, Text, useToast} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import {getApi} from "../../../../../../config/api.ts";


type CommentProps = {
    data: CommentType,
    setComments: any,
    readOnly:boolean
}
/**
 * Comment Component
 *
 * This component represents an individual comment within a post, allowing users to view and optionally delete the comment.
 *
 * Features:
 * - Displays the commenter's avatar, username, and the content of the comment.
 * - Provides a delete button to remove the comment if the user is not in read-only mode.
 * - Deletes the comment by sending a request to the backend API.
 *
 * Props:
 * - `data`: An object of type `CommentType` containing the comment data.
 *   - `content`: The content of the comment.
 *   - `creatorUserId`: An object containing user details of the comment creator (e.g., `username`).
 *   - `_id`: The unique identifier of the comment.
 * - `setComments`: A function to update the comments list in the parent component state.
 * - `readOnly`: A boolean flag indicating if the comment is in read-only mode (e.g., if the user cannot delete the comment).
 *
 * Methods:
 * 1. **deleteComment**:
 *    - Sends a DELETE request to the backend API to remove the comment.
 *    - If successful, the comment is removed from the local state using `setComments`.
 * 
 * Usage:
 * - The `Comment` component can be used inside a comment section where each individual comment is rendered.
 * 
 * Example:
 * ```tsx
 * <Comment data={commentData} setComments={setComments} readOnly={false} />
 * ```
 * Where `commentData` is an object of type `CommentType`, `setComments` is a function for updating the comments state, and `readOnly` is a flag to control the ability to delete the comment.
 *
 * Notes:
 * - The component uses Chakra UI for layout and styling.
 * - The delete button is only displayed if `readOnly` is `false`.
 * - The component uses the `getApi` function to handle the DELETE request to the backend API.
 * - The `setComments` function updates the parent component's state by filtering out the deleted comment.
 *
 * Dependencies:
 * - `@chakra-ui/react`: For UI components like avatar, text, and buttons.
 * - `@chakra-ui/icons`: For the delete icon in the delete button.
 * - `../../../../../../config/api.ts`: For making API requests (DELETE request to delete comments).
 * - `../../../../../../@types/comment.type.ts`: Defines the `CommentType` for the comment data structure.
 */

export const Comment = memo(({data, setComments, readOnly}: CommentProps) => {


    const toast = useToast();

    const deleteComment = useCallback(async () => {
        try {
            const response = await getApi().delete(`blogs/comments/${data._id}`);
            if (response.status === 200) setComments((prevState: CommentType[]) => {
                return prevState.filter((x: CommentType) => x._id !== response.data)
            });

            toast({
                title: "Action completed.",
                description: "Comment successfully deleted.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position:"bottom-right"
            })
        } catch (e) {

        }
    }, [data]);

    return <Flex flexDirection={"row"} mt={4} justifyContent={"space-between"}>


        <Flex flexDirection={"column"}>
            <Flex flexDirection={"row"} alignItems={"center"} gap={2}>
                <Avatar name={data.creatorUserId.username}/>
                <Text fontWeight={500}>{data.creatorUserId.username}</Text>
            </Flex>
            <Text ml={10} fontWeight={300}>{data.content}</Text>
        </Flex>

        {
            readOnly ? null : <IconButton
                aria-label={"Comment delete button"}
                icon={<DeleteIcon/>}
                variant={"ghost"}
                colorScheme={"red"}
                onClick={deleteComment}/>
        }

    </Flex>


})