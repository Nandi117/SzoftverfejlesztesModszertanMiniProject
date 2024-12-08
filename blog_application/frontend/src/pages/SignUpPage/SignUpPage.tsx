import {useState} from 'react';
import {Alert, AlertIcon, Box, Button, Flex, FormControl, FormLabel, Heading, Input, VStack} from '@chakra-ui/react';
import {LockIcon} from '@chakra-ui/icons';
import {useNavigate} from "react-router-dom";
import {routes} from "../../config/routes.ts";
import {getApi} from "../../config/api.ts";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/auth/auth.slice.ts";

const SignUpPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [signupInProgress, setSignupInProgress] = useState<boolean>(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async () => {
        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        } else if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setSignupInProgress(true);

        const signupData = {
            username:username,
            email:email,
            password:password
        }

        try{
            const response = await getApi().post("auth/signup", JSON.stringify(signupData));
            if (response.status === 201){
                dispatch(setUser(response.data));
                setTimeout(()=>{
                    navigate(routes.ownPosts.main);
                }, 400);
            }
        }
        catch (e){
            setError("Sign up failed! Try again!");
        }
        finally {
            setSignupInProgress(false);
        }

    };

    return (
        <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
            <Box width="100%" maxWidth="400px" p="8" borderWidth="2px" borderRadius="30px" boxShadow="x1" borderColor="gray.200">
                <VStack spacing={4} align="stretch">
                    <Heading as="h1" size="lg" textAlign="center">
                        Sign Up
                    </Heading>
                    {error && (
                        <Alert status="error">
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}
                    <FormControl id="username">
                        <FormLabel>Username</FormLabel>
                        <Input
                            type="text"
                            data-testid={"username"}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            data-testid={"email"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            data-testid={"password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="confirm-password">
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            type="password"
                            data-testid={"confirm-password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FormControl>
                    <Button leftIcon={<LockIcon />} isLoading={signupInProgress} colorScheme="teal" onClick={handleSignUp}>
                        Sign Up
                    </Button>
                    <Button data-testid={"register-btn"} variant={"ghost"} colorScheme={"purple"} onClick={()=>navigate(routes.login)}>Already have an account?</Button>
                </VStack>
            </Box>
        </Flex>
    );
};

export default SignUpPage;
