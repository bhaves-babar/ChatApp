import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  VStack,
  Text,
  useToast,
} from "@chakra-ui/react";

const CreateGroupPopup = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const toast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/bb/user?search="o"`
        );
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not fetch users.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    if (isOpen) {
      fetchUsers(); // Fetch users only when the popup is open
    }
  }, [isOpen, search, toast]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Group</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Search users"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <VStack mt={4} spacing={3} align="stretch">
            {users.map((user) => (
              <Text key={user._id}>{user.name}</Text>
            ))}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateGroupPopup;
