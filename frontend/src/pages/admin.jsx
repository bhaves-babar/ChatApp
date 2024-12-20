import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [key, setKey] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/bb/admin/', { key });
            if (response.data.valid) {
                setIsValid(true);
                setError('');
            } else {
                setError('Invalid key. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <Box p={4} maxW="md" mx="auto" mt={10} borderWidth={1} borderRadius="lg" boxShadow="lg">
            {isValid ? (
                <VStack spacing={4}>
                    <Text fontSize="2xl" fontWeight="bold">Welcome, Admin!</Text>
                    <Button colorScheme="teal" onClick={() => navigate('/users')}>See all users</Button>
                    <Button colorScheme="teal" onClick={() => navigate('/report')}>See all reports</Button>
                </VStack>
            ) : (
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
                        <FormControl id="key" isRequired>
                            <FormLabel>Enter Key</FormLabel>
                            <Input
                                type="text"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="teal">Submit</Button>
                        {error && <Text color="red.500">{error}</Text>}
                    </VStack>
                </form>
            )}
        </Box>
    );
};

export default Admin;
