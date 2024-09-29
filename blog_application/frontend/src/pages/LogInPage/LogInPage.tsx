import React, {useState} from 'react';
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

const LogInPage = () => {


    const navigate = useNavigate();

    const [cookies, setCookies] = coo
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
            if (response.status === 200){

                navigate(routes.ownPosts.main);
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
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <Button isLoading={loginInProgress} leftIcon={<UnlockIcon/>} colorScheme="teal" onClick={handleLogin}>
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
