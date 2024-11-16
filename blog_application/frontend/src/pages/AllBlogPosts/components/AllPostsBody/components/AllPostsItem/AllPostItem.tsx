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
    useDisclosure
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, StarIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { AllPostsType } from "../../../../@types/allPosts.type.ts";
import { superlikePost } from "../../../../../../store/allPosts/allPostsSlice.ts";

type AllPostItemProps = {
    data: AllPostsType,
}

export const AllPostItem = memo(({ data }: AllPostItemProps) => {
    const dispatch = useDispatch();

    const handleSuperlike = () => {
        dispatch(superlikePost(data._id));
    };

    return (
        <Card>
            <CardHeader>
                <Flex alignItems={"center"}>
                    <Heading as={"h5"} size='sm'>
                        {data.title}
                    </Heading>
                    <Spacer />
                    <Flex>
                        <IconButton aria-label={"Post edit button"} size={"sm"} icon={<EditIcon />} colorScheme='blue' variant={"ghost"} />
                        <IconButton aria-label={"Post delete button"} size={"sm"} icon={<DeleteIcon />} colorScheme='red' variant={"ghost"} />
                        <IconButton aria-label={"Post superlike button"} size={"sm"} icon={<StarIcon />} colorScheme='yellow' variant={"ghost"} onClick={handleSuperlike} />
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text>{data.content}</Text>
            </CardBody>
            <CardFooter>
                <Text>Superlikes: {data.superlikes || 0}</Text>
            </CardFooter>
        </Card>
    );
});