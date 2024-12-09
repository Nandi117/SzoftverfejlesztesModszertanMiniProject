import { useBlogPost } from "./hooks/useBlogPost.ts";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Flex, Heading, Spinner, Button } from "@chakra-ui/react";
import { errorMessages } from "../../config/messages.ts";
import parse from "html-react-parser";
import { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Star } from 'lucide-react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { RepeatIcon } from "@chakra-ui/icons";
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

const BlogPost = () => {
    const {
        loading,
        error,
        translatedText,
        translate,
        translateBlogPost,
        translationError,
        post
    } = useBlogPost();

    const dispatch = useDispatch();
    const [likes, setLikes] = useState(post?.likes);
    const [dislikes, setDislikes] = useState(post?.dislikes);
    const [superlikes, setSuperlikes] = useState(post?.superlikes);
    const [hasSuperliked, setHasSuperliked] = useState(false);

/**
 * Initializes the superlike status for the current post.
 * Checks if the post was superliked on the current day by reading local storage.
 */

    useEffect(() => {
        const superlikeData = JSON.parse(localStorage.getItem("superlikeData") || "{}");
        const today = new Date().toISOString().split('T')[0];
        if (superlikeData[post?._id] === today) {
            setHasSuperliked(true);
        }
    }, [post?._id]);

    /**
 * Handles the logic for liking a blog post.
 * Increments the like count by 1 and updates the state.
 */

    const handleLike = () => {
        setLikes(likes + 1);
    };

/**
 * Handles the logic for disliking a blog post.
 * Increments the dislike count by 1 and updates the state.
 */

    const handleDislike = () => {
        setDislikes(dislikes + 1);
    };


/**
 * Handles the logic for superliking a blog post.
 * Updates local storage to prevent multiple superlikes on the same day,
 * dispatches a superlike action, and increments the superlike count.
 */

    console.log(post)
    const handleSuperlike = () => {
        const today = new Date().toISOString().split('T')[0];
        const superlikeData = JSON.parse(localStorage.getItem("superlikeData") || "{}");
        superlikeData[post._id] = today;
        localStorage.setItem("superlikeData", JSON.stringify(superlikeData));
        setHasSuperliked(true);
        dispatch(superlikePost(post._id));
        setSuperlikes(superlikes + 1);
    };

    if (loading) {
        return <>
            <Flex justifyContent={"center"}>
                <Spinner color={"teal.500"} size={"xl"} mt={10} />
            </Flex>
        </>
    }

    if (error.isError) {
        return <>
            <Alert status={"error"} mx={"auto"} width={"50%"} rounded={"md"}>
                <AlertIcon />
                <AlertTitle>{errorMessages.messageTitle}</AlertTitle>
                <AlertDescription>{errorMessages.messageDescription}</AlertDescription>
            </Alert>
        </>
    }
    /**
 * Triggers the translation process for the current blog post.
 * Calls the translateBlogPost function provided by the useBlogPost hook.
 */

    return <>
        <Flex flexDirection={"column"} alignItems={"center"} mt={"10vh"}>
            <Flex flexDirection={"column"} alignItems={"center"} width={"50%"}>
                
                <Button
                    leftIcon={<RepeatIcon />}
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
                        isDisabled={hasSuperliked}
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