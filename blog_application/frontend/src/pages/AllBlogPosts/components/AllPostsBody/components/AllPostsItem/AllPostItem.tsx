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

export const AllPostItem = memo(({ data }: AllPostItemProps) => {
    const dispatch = useDispatch();

    const handleSuperlike = () => {
        dispatch(superlikePost(data._id));
    };

    return (
        <Card variant={"elevated"} height={300} width={"100%"} boxShadow={"2px 3px 2px rgba(0,0,0,0.15)"}>
            <CardHeader>
                <Flex alignItems={"center"}>
                    <Heading as={"h5"} size='sm'>
                        {data.title}
                    </Heading>
                    <Spacer />
                    <Flex>
                        <IconButton aria-label={"Post superlike button"} size={"sm"} icon={<StarIcon />} colorScheme='yellow' variant={"ghost"} onClick={handleSuperlike} />
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