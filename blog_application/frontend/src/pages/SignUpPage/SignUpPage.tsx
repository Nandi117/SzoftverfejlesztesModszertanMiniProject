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
};

export default SignUpPage;