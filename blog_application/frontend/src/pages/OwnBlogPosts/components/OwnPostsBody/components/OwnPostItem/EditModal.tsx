import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";
import ReactQuill from "react-quill";
import {OwnPostType} from "../../../../@types/ownPost.type.ts";
import {memo, useCallback, useRef, useState} from "react";
import {getApi} from "../../../../../../config/api.ts";
import {useDispatch} from "react-redux";
import {updatePost} from "../../../../../../store/ownPosts/ownPostsSlice.ts";

type EditModalProps = {
    data:OwnPostType,
}
export const EditModal = memo(({data}:EditModalProps) =>{

    const {isOpen, onOpen, onClose} = useDisclosure();

    const [updateInProgress, setUpdateInProgress] = useState<boolean>(false);
    const titleRef = useRef<HTMLInputElement>(null);
    const quillEditorRef = useRef<ReactQuill>(null);
    const dispatch = useDispatch();



    const updateOwnPost = useCallback(async ()=>{

        setUpdateInProgress(true);
        const title = titleRef.current?.value;
        const content = quillEditorRef.current?.value;

        if (!title || title === "") return;

        const modificData = {
            ...data,
            title:title,
            content:content,
        }

        try{
            const response = await getApi().put("blogs", JSON.stringify(modificData));
            if (response.status === 200){
                dispatch(updatePost(response.data));
            }
        }
        catch (e){

        }
        finally {
            setUpdateInProgress(false);
        }
    },[]);

    return <>
        <Button
            aria-label={"View post button"}
            leftIcon={<EditIcon/>}
            colorScheme={"blue"}
            variant={"ghost"}
            isLoading={updateInProgress}
            onClick={onOpen}
            size={"sm"}>Edit</Button>

        <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader>Edit {data.title}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <FormControl>
                        <FormLabel>Title</FormLabel>
                        <Input type='text' defaultValue={data.title} ref={titleRef}/>

                        <FormLabel mt={3}>Tartalom</FormLabel>
                        <ReactQuill theme="snow" value={data.content} style={{height: 800}} ref={quillEditorRef}/>
                    </FormControl>


                </ModalBody>
                <ModalFooter gap={2} mt={10}>
                    <Button colorScheme={"teal"} onClick={updateOwnPost}>Update post</Button>
                    <Button colorScheme='blue' variant='ghost' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    </>

})