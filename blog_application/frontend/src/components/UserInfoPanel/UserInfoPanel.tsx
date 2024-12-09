import React, {memo, useState} from "react";
import {
    Alert,
    AlertIcon,
    Avatar,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
    VStack
} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import {ArrowForwardIcon, InfoOutlineIcon} from "@chakra-ui/icons";
import {useCookies} from "react-cookie";
import {getApi} from "../../config/api.ts"; // Adjust according to your project structure

/**
 * UserInfoPanel Component
 *
 * This component displays user account information and provides functionality for logging out and changing the password.
 * It leverages Chakra UI for styling and Redux for accessing user data from the application state.
 *
 * Features:
 * - Displays user avatar, username, and email.
 * - Logout functionality to clear user session (cookies and localStorage).
 * - Password change functionality with validation and feedback (success or error messages).
 * - Responsive UI elements using Chakra UI components.
 *
 * Dependencies:
 * - `react-redux`: Accesses the authenticated user state from Redux.
 * - `react-cookie`: Handles cookies for retrieving the authentication token.
 * - `react-router-dom`: Used for navigation in related components.
 * - `@chakra-ui/react`: Provides styled UI components.
 * - `getApi`: Axios instance for making authenticated API requests.
 *
 * Props:
 * - None.
 *
 * State:
 * - `currentPassword`: Stores the current password input by the user.
 * - `newPassword`: Stores the new password input by the user.
 * - `confirmPassword`: Ensures the new password matches during validation.
 * - `changeInProgress`: Indicates whether the password change request is in progress.
 * - `error`: Stores any error message to display during password change.
 * - `success`: Stores the success message to display upon successful password change.
 * - `isChangingPassword`: Toggles the visibility of the password change form.
 *
 * Behavior:
 * - Displays a user avatar button in the navigation bar.
 * - Clicking the avatar opens a popover with account information, logout button, and password change button.
 * - Clicking "Change Password" displays a form with inputs for current and new passwords.
 * - Validates the form:
 *   - Ensures all fields are filled.
 *   - Checks if new passwords match.
 * - Sends an API request to update the password using the token stored in cookies.
 * - Displays error or success messages based on the API response.
 * - Logs out the user by removing cookies and clearing localStorage.
 *
 * Usage:
 * - Include this component in the navigation bar or any UI section where account management is needed.
 * - Example:
 *   ```
 *   import { UserInfoPanel } from './UserInfoPanel';
 *   ...
 *   <UserInfoPanel />
 *   ```
 *
 * Notes:
 * - Ensure the API endpoint `/auth/change-password` exists and follows the expected request/response structure.
 * - Customize styles and messages as needed for your application.
 */


export const UserInfoPanel = memo(() => {
    const user = useSelector((state: any) => state.auth.user);
    const [cookies, setCookies, removeCookies] = useCookies(["AUTH_TOKEN"]);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
    const [changeInProgress, setChangeInProgress] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isChangingPassword, setIsChangingPassword] = useState(false); // To toggle the password change form

    const logout = () => {
        console.log("lefutok")
        removeCookies("AUTH_TOKEN");
        localStorage.removeItem("UserInfo");

    };

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            setError('Please fill in all fields');
            setSuccess('');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
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
                <Avatar name={user?.username} />
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
                        <Avatar size={"md"} name={user?.username} />
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
                            <FormControl id="confirm-password">
                                <FormLabel>Confirm New Password</FormLabel>
                                <Input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
