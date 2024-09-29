import {memo, useCallback, useState} from "react";
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
    useDisclosure
} from "@chakra-ui/react";
import {getApi} from "../../../../../../config/api.ts";
import {CommentType} from "../../../../../../@types/comment.type.ts";
import {Comment} from "./Comment.tsx";

type CommentsModalProps = {
    postId: string
}

export const CommentsModal = memo(({postId}: CommentsModalProps) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

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
                return {...prevState, isError: false};
            });
        } catch (e) {
            setError((prevState: any) => {
                return {...prevState, isError: true};
            });
        } finally {
            setLoading(false);
        }
    }, [postId]);

    const handleCommentSubmit = async () => {
        const newCommentData = {
            postId,
            comment: newComment,
        };

        try {
            const response = await getApi().post("/blogs/comments", JSON.stringify(newCommentData));
            setComments(prevComments => [...prevComments, response.data]);
            setNewComment("");
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
                <ModalCloseButton/>
                <ModalBody>
                    {
                        error.isError === true ? error.errorMessage :
                            comments?.map((comment) => {
                                return <Comment key={comment._id} data={comment} setComments={setComments}/>
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