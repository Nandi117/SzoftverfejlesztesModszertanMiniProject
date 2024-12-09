import { memo, useCallback, useState } from "react";
import {
    Badge,
    Button, Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Text,
    Textarea,
    useDisclosure, useToast
} from "@chakra-ui/react";
import { getApi } from "../../../../../../config/api.ts";
import { CommentType } from "../../../../../../@types/comment.type.ts";
import { Comment } from "./Comment.tsx";

type CommentsModalProps = {
    postId: string
}

/**
 * CommentsModal Component
 *
 * This component displays a modal dialog for viewing and adding comments related to a post.
 * It fetches existing comments, allows users to post new comments, and handles the display of any error messages.
 *
 * Features:
 * - Displays a list of comments for a specific post.
 * - Allows users to add new comments via a form.
 * - Supports loading and error handling states for fetching and submitting comments.
 * - Provides a button to open the modal and display the comments.
 *
 * Props:
 * - `postId`: The unique identifier of the post whose comments are being managed.
 *
 * State:
 * - `comments`: An array of `CommentType` objects representing the comments for the post.
 * - `loading`: A boolean flag indicating if the comments are being loaded.
 * - `error`: An object containing error details, with an `isError` flag and an error message.
 * - `newComment`: A string representing the content of the new comment being added.
 *
 * Methods:
 * 1. **getComments**:
 *    - Fetches the comments for the specified post (`postId`) from the backend API.
 *    - Sets the `comments` state with the fetched data.
 *    - Sets error state in case of failure.
 * 
 * 2. **handleCommentSubmit**:
 *    - Submits a new comment by sending a POST request to the backend API.
 *    - If successful, appends the new comment to the `comments` state and resets the `newComment` state.
 * 
 * Usage:
 * - The `CommentsModal` component can be used within a post to display and manage comments.
 * 
 * Example:
 * ```tsx
 * <CommentsModal postId="1234" />
 * ```
 * Where `postId` is the ID of the post to manage comments for.
 *
 * Notes:
 * - The modal displays a loading state while fetching comments and an error message if fetching fails.
 * - New comments are submitted by typing in a text area and clicking the "Submit Comment" button.
 * - The `getApi` function is used to make API requests for fetching and posting comments.
 * - Chakra UI components are used for styling the modal and buttons.
 *
 * Dependencies:
 * - `@chakra-ui/react`: For modal, button, badge, and other UI components.
 * - `../../../../../../config/api.ts`: For making API requests to fetch and submit comments.
 * - `../../../../../../@types/comment.type.ts`: Defines the `CommentType` for comment data structure.
 * - `./Comment.tsx`: For rendering individual comments inside the modal.
 */


export const CommentsModal = memo(({ postId }: CommentsModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();


    const toast = useToast();
    const [comments, setComments] = useState<CommentType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>({
        isError: false,
        errorMessage: "Unable to load comments!"
    });
    const [newComment, setNewComment] = useState<string>("");

    const getComments = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getApi().get(`blogs/comments/${postId}`);
            setComments(response.data);
            setError((prevState: any) => {
                return { ...prevState, isError: false };
            });


        } catch (e) {
            setError((prevState: any) => {
                return { ...prevState, isError: true };
            });
        } finally {
            setLoading(false);
        }
    }, [postId]);

    const handleCommentSubmit = async () => {
        const newCommentData = {
            postId,
            content: newComment,
        };

        try {
            const response = await getApi().post("/blogs/comments", JSON.stringify(newCommentData));
            setComments(prevComments => [...prevComments, response.data]);
            setNewComment("");
            toast({
                title: "Action completed.",
                description: "Comment successfully created.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position:"bottom-right"
            })
        } catch (e) {
            console.error('Error adding comment:', e);
        }
    };

    return <>
        <Button isLoading={loading} size={"sm"} variant={"ghost"} onClick={() => {
            getComments().then(() => {
                onOpen();
            });
        }}>Comments</Button>

        <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>
                    <Flex alignItems={"center"} gap={2}>
                        <Text>Comments</Text>
                        <Badge colorScheme='purple'>{comments.length}</Badge>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {
                        error.isError === true ? error.errorMessage :
                            comments?.map((comment) => {
                                return <Comment key={comment._id} data={comment} setComments={setComments} readOnly={false} />
                            })
                    }
                    <Textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your comment here..."
                        mt={4}
                    />
                </ModalBody>
                <ModalFooter gap={2} mt={10}>
                    <Button colorScheme="teal" onClick={handleCommentSubmit}>
                        Submit Comment
                    </Button>
                    <Button colorScheme='blue' variant='ghost' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
});