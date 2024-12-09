import  {useState} from 'react';
import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    VStack
} from '@chakra-ui/react';
import {UnlockIcon} from '@chakra-ui/icons';
import {Link, useNavigate} from 'react-router-dom';
import {getApi} from "../../config/api.ts";
import {routes} from "../../config/routes.ts";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/auth/auth.slice.ts";



/**
 * Component: LogInPage
 *
 * This component renders the login page for the application. It provides a form where users can enter their email
 * and password to log in. Upon successful login, the user is redirected to the main posts page. If an error occurs, 
 * an error message is displayed.
 *
 * Features:
 * - Collects email and password from the user.
 * - Sends a POST request to authenticate the user using the `/auth/signin` endpoint.
 * - Displays an error message if the login attempt fails (invalid email or password).
 * - Shows a loading indicator while the login request is being processed.
 * - Redirects the user to the main posts page upon successful login.
 *
 * Dependencies:
 * - `useState`: React hook to manage the state for email, password, error, and login progress.
 * - `useNavigate`: React Router hook for programmatic navigation.
 * - `useDispatch`: Redux hook for dispatching actions to the store.
 * - `getApi`: Custom API utility for making HTTP requests.
 * - `setUser`: Redux action to store the authenticated user data.
 * - `routes`: Configuration object that contains the app's route paths.
 *
 * API:
 * - POST `/auth/signin`: This API call is used to authenticate a user with the provided email and password. 
 *   If successful, the user data is returned and saved in the Redux store.
 *
 *
 */


const LogInPage = () => {


    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [loginInProgress, setLoginInProgress] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {

        if (!email || !password) {
            setError('Please fill in both fields');
            return;
        }
        setLoginInProgress(true)
        const loginData = {
            email:email,
            password:password
        }

        try{
            const response = await getApi().post("/auth/signin", JSON.stringify(loginData));
            if (response.status === 201){
                const data = response.data;
                dispatch(setUser(data));
                setError("");
                setTimeout(()=>{
                    navigate(routes.ownPosts.main);
                }, 400);
            }
        }
        catch (e){
            setError("Invalid email or password!")
        }
        finally {
            setLoginInProgress(false)
        }



    }

    return (
        <Flex height={"100vh"} alignItems={"center"} justifyContent={"center"}>
            <Box width="100%" maxWidth="400px" p="8" borderWidth="2px" borderRadius="30px" boxShadow="x1" borderColor="gray.200">
                <VStack spacing={4} align="stretch">
                    <Heading as="h1" size="lg" textAlign="center">
                        Log In
                    </Heading>
                    {error && (
                        <Alert status="error">
                            <AlertIcon />
                            {error}
                        </Alert>
                    )}
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input
                            data-testid={"email"}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                            data-testid={"password"}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <Button data-testid={"login-btn"} isLoading={loginInProgress} leftIcon={<UnlockIcon/>} colorScheme="teal" onClick={handleLogin}>
                        Log In
                    </Button>

                    <Text align="center">
                        Don't have an account?{' '}
                        <Link to="/signup" style={{ color: 'teal', textDecoration: 'underline' }}>
                            Sign Up
                        </Link>
                    </Text>
                </VStack>
            </Box>
        </Flex>
    );
};

export default LogInPage;
