import React, { useState } from "react";
import {
    Avatar, Button, Flex, Popover, PopoverArrow,
    PopoverBody, PopoverCloseButton, PopoverContent, 
    PopoverHeader, PopoverTrigger, Text, FormControl, 
    FormLabel, Input, Alert, AlertIcon, VStack
} from "@chakra-ui/react";
import { memo } from "react";
import { useSelector } from "react-redux";
import { ArrowForwardIcon, InfoOutlineIcon } from "@chakra-ui/icons";
import { useCookies } from "react-cookie";
import { getApi } from "../../config/api.ts"; // Adjust according to your project structure

export const UserInfoPanel = memo(() => {
    const user = useSelector((state: any) => state.auth.user);
    const [cookies, setCookies, removeCookies] = useCookies(["AUTH_TOKEN"]);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [changeInProgress, setChangeInProgress] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false); // To toggle the password change form

    const logout = () => {
        removeCookies("AUTH_TOKEN");
        localStorage.removeItem("UserInfo");
    };

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword) {
            setError('Please fill in both fields');
            setSuccess('');
            return;
        }

        setChangeInProgress(true);

        const changePasswordData = {
            currentPassword,
            newPassword,
        };

        try {
            const token = cookies.AUTH_TOKEN; // Now using cookies to get the token
            if (!token) {
                throw new Error("No authentication token found. Please log in again.");
            }

            const response = await getApi().post('/auth/change-password', changePasswordData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setError('');
                setSuccess('Password changed successfully.');
                setTimeout(() => {
                    setIsChangingPassword(false); // Close the form after success
                }, 1500); // Optionally redirect here
            }
        } catch (e: any) {
            setError(e.response?.data?.error || 'Failed to change password.');
            setSuccess('');
        } finally {
            setChangeInProgress(false);
        }
    };

    if (!user) return null;

    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                    <Flex alignItems={"center"} gap={2}>
                        <InfoOutlineIcon />
                        <Text>Account information</Text>
                    </Flex>
                </PopoverHeader>
                <PopoverBody>
                    <Flex flexDirection={"column"} alignItems={"center"} gap={4}>
                        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                        <Text fontWeight={600} fontSize={20}>
                            {user.username}
                        </Text>
                        <Text>{user.email}</Text>
                    </Flex>
                    <Button
                        rightIcon={<ArrowForwardIcon />}
                        colorScheme={"red"}
                        size={"sm"}
                        width={"100%"}
                        mt={4}
                        onClick={logout}
                    >
                        Logout
                    </Button>

                    {/* Change Password Button */}
                    <Button
                        colorScheme="teal"
                        size="sm"
                        mt={4}
                        onClick={() => setIsChangingPassword(true)} // Show password change form
                    >
                        Change Password
                    </Button>

                    {/* Change Password Form */}
                    {isChangingPassword && (
                        <VStack spacing={4} align="stretch" mt={4}>
                            {error && (
                                <Alert status="error">
                                    <AlertIcon />
                                    {error}
                                </Alert>
                            )}
                            {success && (
                                <Alert status="success">
                                    <AlertIcon />
                                    {success}
                                </Alert>
                            )}
                            <FormControl id="current-password">
                                <FormLabel>Current Password</FormLabel>
                                <Input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </FormControl>
                            <FormControl id="new-password">
                                <FormLabel>New Password</FormLabel>
                                <Input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </FormControl>
                            <Button
                                isLoading={changeInProgress}
                                leftIcon={<ArrowForwardIcon />}
                                colorScheme="teal"
                                size="sm"
                                onClick={handleChangePassword}
                            >
                                Change Password
                            </Button>
                        </VStack>
                    )}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
});
