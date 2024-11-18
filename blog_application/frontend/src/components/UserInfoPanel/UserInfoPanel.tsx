import {
    Avatar, Button, Flex,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import {memo, useState} from "react";
import {useSelector} from "react-redux";
import {ArrowForwardIcon, InfoOutlineIcon} from "@chakra-ui/icons";
import {useCookies} from "react-cookie";
import { changePassword } from "../../hooks/handleChangePassword";


export const UserInfoPanel = memo(() =>{

    const user = useSelector((state:any)=>state.auth.user);

    const [cookies, setCookies, removeCookies] = useCookies(["AUTH_TOKEN"]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const toast = useToast();

    const logout = () =>{
        removeCookies("AUTH_TOKEN");
        localStorage.removeItem("UserInfo")
    }

    const handleChangePassword = async () => {
        try {
            const token = cookies.AUTH_TOKEN;

            const message = await changePassword(currentPassword, newPassword, token);

            toast({
                title: "Password Changed",
                description: message,
                status: "success",
                duration: 5000,
                isClosable: true,
            });

            // Clear the modal fields and close the modal
            setCurrentPassword("");
            setNewPassword("");
            onClose();
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.response?.data?.error || "Failed to change password.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };



    if (!user) return null;

    return <Popover
            placement='bottom'
        >
            <PopoverTrigger>
                <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov'/>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                    <Flex alignItems={"center"} gap={2}>
                        <InfoOutlineIcon/>
                        <Text>Account information</Text>
                    </Flex>
                  </PopoverHeader>
                <PopoverBody>
                    <Flex flexDirection={"column"} alignItems={"center"} gap={4}>
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov'/>
                        <Text fontWeight={600} fontSize={20}>{user.username}</Text>
                        <Text>{user.email}</Text>
                    </Flex>
                    <Button rightIcon={<ArrowForwardIcon/>} colorScheme={"red"} size={"sm"} width={"100%"} mt={4} onClick={logout}>Logout</Button>
                </PopoverBody>
            </PopoverContent>
        </Popover>


})