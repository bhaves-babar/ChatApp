import React from "react";
import { Box, Text, IconButton, HStack, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios from "axios";

const AddUsers = ({ userId }) => {
  const toast = useToast();
  const handleAddUser = async (userId) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData?.token;

      if (!token) {
        return toast({
          title: "Authentication Error",
          description: "No token found. Please log in.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }

      const response = await axios.post(
        `http://localhost:5000/bb/chats`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast({
          title: "User Added",
          description: `User with ID ${userId} has been added successfully.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error("Failed to add user");
      }
    } catch (error) {
      toast({
        title: "Error Adding User",
        description: "There was an issue adding the user.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box mt={4}>
      <HStack justifyContent="space-between">
        <Text>User ID: {userId}</Text>
        <IconButton
          icon={<AddIcon />}
          size="sm"
          onClick={() => handleAddUser(userId)}
          aria-label="Add User"
        />
      </HStack>
    </Box>
  );
};

export default AddUsers;