import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

const SeeUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/bb/admin/users');
                setUsers(response.data);
            } catch (err) {
                setError('Failed to fetch users. Please try again.');
            }
        };

        fetchUsers();
    }, []);

    return (
        <Box>
            <Text fontSize="xl" fontWeight="bold">All Users</Text>
            {error && <Text color="red.500">{error}</Text>}
            <Table variant="simple" mt={4}>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((user) => (
                        <Tr key={user._id}>
                            <Td>{user._id}</Td>
                            <Td>{user.name}</Td>
                            <Td>{user.email}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default SeeUsers;
