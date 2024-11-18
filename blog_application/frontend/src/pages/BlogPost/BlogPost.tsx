import { useBlogPost } from "./hooks/useBlogPost.ts";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Flex, Heading, Spinner, Button } from "@chakra-ui/react";
import {errorMessages} from "../../config/messages.ts";
import parse from "html-react-parser";
import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import {RepeatIcon} from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { superlikePost } from "../../store/allPosts/allPostsSlice.ts";

interface Post {
    _id: string;
    title: string;
    content: string;
    likes: number;
    dislikes: number;
    superlikes: number;
}

const BlogPost = ({ post }: { post: Post }) => {
    const {
        loading,
        error,
        translatedText,
        translate,
        translateBlogPost,
        translationError
    } = useBlogPost();

    const dispatch = useDispatch();
    const [likes, setLikes] = useState(post.likes);
    const [dislikes, setDislikes] = useState(post.dislikes);
    const [superlikes, setSuperlikes] = useState(post.superlikes);

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleDislike = () => {
        setDislikes(dislikes + 1);
    };

    const handleSuperlike = () => {
        dispatch(superlikePost(post._id));
        setSuperlikes(superlikes + 1);
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
            <Flex flexDirection={"column"} alignItems={"center"}  width={"50%"}>

                <Button
                    leftIcon={<RepeatIcon/>}
                    isLoading={translate}
                    title={"Translate this post"}
                    alignSelf={"end"}
                    size={"sm"}
                    loadingText={"Translation..."}
                    onClick={translateBlogPost}
                    colorScheme={translationError ? "red" : "gray"}
                >
                    {translationError ? "Translation failed" : "Translate HU"}
                </Button>
                <Heading as={"h5"} alignSelf={"start"} mt={4}>{post?.title}</Heading>
                <Box mt={5}>
                    {post?.content ? parse(post?.content || "") : null}
                </Box>
                {
                    translatedText ? <Box mt={5} alignSelf={"start"} color={"red"}>
                        {parse(translatedText)}
                    </Box> : null
                }
            </Flex>
            <Flex gap={4} mt={4}>
                <Tooltip label="Superlike">
                    <IconButton
                        aria-label="Superlike"
                        icon={<Star />}
                        colorScheme="yellow"
                        variant="solid"
                        onClick={handleSuperlike}
                    />
                </Tooltip>
                <Box>{superlikes}</Box>
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
        </Flex>
    </>
};

export default BlogPost;