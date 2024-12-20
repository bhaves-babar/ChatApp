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
  Avatar,
  Text,
} from "@chakra-ui/react";

const ProfilePopup = ({ isOpen, onClose }) => {
  const [user, setUser] = useState({ name: "", email: "", pic: "" });

  useEffect(() => {
    // Fetch user data from localStorage
    const storedUserData = localStorage.getItem("userData");
    
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUser({
        name: parsedUserData.name,
        email: parsedUserData.email,
        pic: parsedUserData.pic || "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/", // Fallback if no profile picture
      });
    }
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Avatar size="xl" name={user.name} src={user.pic} />
          <Text mt={4} fontSize="lg" fontWeight="bold">
            Name: {user.name}
          </Text>
          <Text>Email: {user.email}</Text>
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

export default ProfilePopup;
