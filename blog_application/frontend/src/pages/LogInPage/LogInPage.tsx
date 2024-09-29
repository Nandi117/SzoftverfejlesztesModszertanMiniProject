import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, Alert, AlertIcon } from '@chakra-ui/react';

const LogInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // Add your authentication logic here
        if (!email || !password) {
            setError('Please fill in both fields');
        } else {
            setError('');
            // Proceed with login logic
            console.log('Logging in with', email, password);
        }
    };

    return (
        <Box width="100%" maxWidth="400px" mx="auto" mt="10">
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
                <Button colorScheme="teal" onClick={handleLogin}>
                    Log In
                </Button>
            </VStack>
        </Box>
    );
};

export default LogInPage;
