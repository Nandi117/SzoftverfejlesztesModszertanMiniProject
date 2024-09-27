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
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {useOwnPostItem} from "./hooks/useOwnPostItem.ts";

type OwnPostItemProps = {
    data: any,

}

export const OwnPostItem = memo(({data}: OwnPostItemProps) => {

    const {isOpen, onOpen, onClose} = useDisclosure();

    const {
        deleteOwnPost,
        updateOwnPost
    } = useOwnPostItem();



    return <div>
        <Card>
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
                                    variant={"ghost"} onClick={deleteOwnPost}/>

                    </Flex>
                </Flex>

            </CardHeader>
            <CardBody>
                {data.content}
            </CardBody>
            <CardFooter>
                {data.author}
            </CardFooter>
        </Card>
        <Modal size={"6xl"} isOpen={isOpen} onClose={onClose} >
            <ModalContent>
                <ModalHeader>Edit {data.title}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input type='email' />
                    </FormControl>

                    <ReactQuill theme="snow" value={""} style={{height:800, marginTop:"1em"}}/>
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