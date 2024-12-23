import {memo, useCallback} from "react";
import {CommentType} from "../../../../../../@types/comment.type.ts";
import {Avatar, Flex, IconButton, Text, useToast} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";
import {getApi} from "../../../../../../config/api.ts";


type CommentProps = {
    data: CommentType,
    setComments: any
}

export const Comment = memo(({data, setComments}: CommentProps) => {

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


        <IconButton
            aria-label={"Comment delete button"}
            icon={<DeleteIcon/>}
            variant={"ghost"}
            colorScheme={"red"}
            onClick={deleteComment}/>
    </Flex>


})