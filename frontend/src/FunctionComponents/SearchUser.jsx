import React, { useState } from 'react';
import axios from 'axios';
import { Box, Input, Button, useToast, VStack, HStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import SearchResult from './SearchResult';

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  const handleSearch = async () => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const token = userData?.token;

    if (!token) {
      toast({
        title: 'Authentication Error',
        description: 'No token found. Please log in.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/bb/user?search=${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      if (response.data.length === 0) {
        return toast({
          title: 'No User Found',
          description: 'No users matched your search.',
          status: 'info',
          duration: 5000,
          isClosable: true,
        });
      }
      setIsModalOpen(true);
      toast({
        title: 'Search Successful',
        description: 'User data fetched successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Search Error',
        description: 'There was an error fetching user data.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setUsers([]);
  };

  return (
    <Box p="4" maxW="md" mx="auto">
      <VStack spacing="4" align="stretch">
        <HStack spacing="2" width="100%">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a user"
            flex="1"
          />
          <Button onClick={handleSearch} colorScheme="teal">
            Search
          </Button>
        </HStack>

        {/* Modal for Search Results */}
        <Modal isOpen={isModalOpen} onClose={handleClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Search Results</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SearchResult users={users} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={handleClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Box>
  );
};

export default SearchUser;
