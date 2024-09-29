import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, Alert, AlertIcon, Flex } from '@chakra-ui/react';
import { UnlockIcon } from '@chakra-ui/icons';

const LogInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            setError('Please fill in both fields');
        } else {
            setError('');
            console.log('Logging in with', email, password);
        }
    };

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
                    <Button leftIcon={<UnlockIcon/>} colorScheme="teal" onClick={handleLogin}>
                        Log In
                    </Button>
                </VStack>
            </Box>
        </Flex>
    );
};

export default LogInPage;
