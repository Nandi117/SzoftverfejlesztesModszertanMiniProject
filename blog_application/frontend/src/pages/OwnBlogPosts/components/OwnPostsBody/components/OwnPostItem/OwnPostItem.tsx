import {memo} from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Heading, IconButton, Text} from "@chakra-ui/react";
import {DeleteIcon, ViewIcon} from "@chakra-ui/icons";
import 'react-quill/dist/quill.snow.css';
import {useOwnPostItem} from "./hooks/useOwnPostItem.ts";
import parse from 'html-react-parser';
import {OwnPostType} from "../../../../@types/ownPost.type.ts";
import {CommentsModal} from "./CommentsModal.tsx";
import {EditModal} from "./EditModal.tsx";

type OwnPostItemProps = {
    data: OwnPostType,

}

export const OwnPostItem = memo(({data}: OwnPostItemProps) => {




    const {
        deleteOwnPost,
        updateOwnPost,
    } = useOwnPostItem();

    return <div>
        <Card height={300}>
            <CardHeader
                height={100}
                borderTopRadius={5}
                backgroundImage={data.image || "https://blogs.windows.com/wp-content/uploads/prod/sites/2/2021/10/Windows-11-Bloom-Screensaver-Dark-scaled.jpg"}
                objectFit={"cover"}
                backgroundPosition={"center"}
            >

            </CardHeader>
            <CardBody mx={1} overflow={"hidden"}>
                <Heading as={"h4"} pb={1} size='sm'>
                    {data.title}
                </Heading>
                {data.content ? <Text mt={3} fontSize={"sm"}>{parse(data.content)}</Text> : null}
            </CardBody>
            <CardFooter justifyContent={"space-around"} alignItems={"center"}>
                <Button
                    aria-label={"View post button"}
                    leftIcon={<ViewIcon/>}
                    colorScheme={"teal"}
                    variant={"ghost"}
                    onClick={() => window.open(`posts/${data._id}`)}
                    size={"sm"}>View</Button>
                <EditModal data={data}/>
                <CommentsModal postId={data._id}/>


                <IconButton
                    aria-label={"Post delete button"}
                    size={"sm"}
                    icon={<DeleteIcon/>}
                    colorScheme='red'
                    variant={"ghost"}
                    onClick={() => deleteOwnPost(data._id)}/>

            </CardFooter>
        </Card>

    </div>
});