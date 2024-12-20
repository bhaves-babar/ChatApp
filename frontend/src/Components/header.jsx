import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Button, Text, Spacer, Avatar, IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import SearchUser from "../FunctionComponents/SearchUser";
import ProfilePopup from "../FunctionComponents/ProfilePopup";
import CreateGroupPopup from "../FunctionComponents/CreateGroupPopup"; // Import CreateGroupPopup

const Header = () => {
  const [user] = useState({
    email: 'user@example.com',
    name: 'John Doe',
    pic: 'https://via.placeholder.com/150',
    token: '',
    _id: ''
  });

  const [isProfileOpen, setProfileOpen] = useState(false);
  const [isGroupPopupOpen, setGroupPopupOpen] = useState(false); // State for CreateGroupPopup
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logged out");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  const profile = () => {
    setProfileOpen(true);
  };

  const openGroupPopup = () => {
    setGroupPopupOpen(true); // Open the CreateGroupPopup
  };

  return (
    <Flex
      bg="blue.500"
      p="2"
      alignItems="center"
      color="white"
      shadow="md"
      height="80px"
    >
      <Text fontSize="xl" fontWeight="bold" color="white">
        ChatApp
      </Text>
      <Spacer />
      <Box width="30%">
        <SearchUser />
      </Box>
      <IconButton
        icon={<AddIcon />}
        colorScheme="teal"
        ml="4"
        onClick={openGroupPopup} // Open popup on click
        aria-label="Create Group"
      />
      <Avatar name={user.name} src={user.pic} ml="4" onClick={profile} cursor="pointer" />
      <Button colorScheme="red" ml="4" onClick={handleLogout}>
        Logout
      </Button>

      {/* Profile Popup */}
      <ProfilePopup
        user={user}
        isOpen={isProfileOpen}
        onClose={() => setProfileOpen(false)}
      />

      {/* Create Group Popup */}
      <CreateGroupPopup
        isOpen={isGroupPopupOpen}
        onClose={() => setGroupPopupOpen(false)}
      />
    </Flex>
  );
};

export default Header;