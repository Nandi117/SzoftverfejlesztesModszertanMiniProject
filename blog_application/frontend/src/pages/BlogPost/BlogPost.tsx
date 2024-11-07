import { useBlogPost } from "./hooks/useBlogPost.ts";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { errorMessages } from "../../config/messages.ts";
import parse from "html-react-parser";
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { IconButton, Tooltip } from '@chakra-ui/react';

const BlogPost = () => {
    const {
        loading,
        error,
        post
    } = useBlogPost();

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleDislike = () => {
        setDislikes(dislikes + 1);
    };

    if (loading) {
        return <>
            <Flex justifyContent={"center"}>
                <Spinner color={"teal.500"} size={"xl"} mt={10 }/>
            </Flex>
        </>
    }
    if (error.isError) {
        return <>
            <Alert status={"error"} mx={"auto"} width={"50%"} rounded={"md"}>
                <AlertIcon/>
                <AlertTitle>{errorMessages.messageTitle}</AlertTitle>
                <AlertDescription>{errorMessages.messageDescription}</AlertDescription>
            </Alert>
        </>
    }
    return <>
        <Flex flexDirection={"column"} alignItems={"center"} mt={10}>
            <Box width={"50%"}>
                <Heading as={"h5"}>{post?.title}</Heading>
                <Box mt={5}>
                    {post?.content ? parse(post?.content || "") : null}
                </Box>
                <Flex gap={4} mt={4}>
                    <Tooltip label="Like">
                        <IconButton
                            aria-label="Like"
                            icon={<ThumbsUp />}
                            colorScheme="teal"
                            variant="solid"
                            onClick={handleLike}
                        />
                    </Tooltip>
                    <Box>{likes}</Box>
                    <Tooltip label="Dislike">
                        <IconButton
                            aria-label="Dislike"
                            icon={<ThumbsDown />}
                            colorScheme="red"
                            variant="solid"
                            onClick={handleDislike}
                        />
                    </Tooltip>
                    <Box>{dislikes}</Box>
                </Flex>
            </Box>
        </Flex>
    </>
};

export default BlogPost;