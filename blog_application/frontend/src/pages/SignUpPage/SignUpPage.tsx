import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, Alert, AlertIcon, Flex } from '@chakra-ui/react';
import { LockIcon } from '@chakra-ui/icons';

const SignUpPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = () => {
        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
        } else if (password !== confirmPassword) {
            setError('Passwords do not match');
        } else {
            setError('');
            console.log('Signing up with', username, email, password);
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
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>
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
                    <FormControl id="confirm-password">
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </FormControl>
                    <Button leftIcon={<LockIcon />} colorScheme="teal" onClick={handleSignUp}>
                        Sign Up
                    </Button>

                    <Text align="center">
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: 'teal', textDecoration: 'underline' }}>
                            Log in
                        </Link>
                    </Text>
                </VStack>
            </Box>
        </Flex>
    );
};

export default SignUpPage;
