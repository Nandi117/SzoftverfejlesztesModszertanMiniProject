import {memo} from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Spacer,
    useDisclosure
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon, ViewIcon} from "@chakra-ui/icons";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useOwnPostItem} from "./hooks/useOwnPostItem.ts";
import parse from 'html-react-parser';
import {OwnPostType} from "../../../../@types/ownPost.type.ts";
import {CommentsModal} from "./CommentsModal.tsx";

type OwnPostItemProps = {
    data: OwnPostType,

}

export const OwnPostItem = memo(({data}: OwnPostItemProps) => {

    const {isOpen, onOpen, onClose} = useDisclosure();


    const {
        deleteOwnPost,
        updateOwnPost,
        viewPost,
    } = useOwnPostItem();

    return <div>
        <Card height={300}>
            <CardHeader>
                <Flex alignItems={"center"}>
                    <Heading as={"h5"} size='sm'>
                        {data.title}
                    </Heading>
                    <Spacer/>
                    <Flex>
                        <IconButton aria-label={"Post delete button"} size={"sm"} icon={<EditIcon/>}
                                    colorScheme='blue' variant={"ghost"} onClick={onOpen}/>
                        <IconButton aria-label={"Post delete button"} size={"sm"} icon={<DeleteIcon/>} colorScheme='red'
                                    variant={"ghost"} onClick={() => deleteOwnPost(data._id)} />

                    </Flex>
                </Flex>

            </CardHeader>
            <CardBody mx={1} overflow={"hidden"}>
                { data.content ?  parse(data.content) : null}
            </CardBody>
            <CardFooter justifyContent={"end"} alignItems={"center"}>
                <Button
                    aria-label={"View post button"}
                    leftIcon={<ViewIcon/>}
                    colorScheme={"teal"}
                    variant={"ghost"}
                    onClick={()=>viewPost(data._id)}
                    size={"sm"}>View</Button>
                <CommentsModal postId={data._id}/>
            </CardFooter>
        </Card>
        <Modal size={"6xl"} isOpen={isOpen} onClose={onClose} >
            <ModalContent>
                <ModalHeader>Edit {data.title}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input type='text' defaultValue={data.title}/>
                    </FormControl>

                    <ReactQuill theme="snow" value={data.content} style={{height:800, marginTop:"1em"}}/>
                </ModalBody>
                <ModalFooter gap={2} mt={10}>
                    <Button  colorScheme={"teal"} onClick={updateOwnPost}>Update post</Button>
                    <Button colorScheme='blue' variant='ghost' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
});