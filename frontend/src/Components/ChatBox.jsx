import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Text,
  Avatar,
  HStack,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import io from "socket.io-client";
import ReportForm from "../FunctionComponents/ReportForm"; // Import the ReportForm component

const ENDPOINT = "http://localhost:5000"; // Ensure this matches your server endpoint
let socket, selectedChatCompare;

const Chatbox = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure(); // For controlling the modal
  const toast = useToast();

  // Fetch messages for the current chat
  useEffect(() => {
    const fetchMessages = async () => {
      if (!user) return;

      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData?.token;

      if (!token) {
        toast({
          title: "Authentication Error",
          description: "No token found. Please log in.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/bb/message/${user.chatId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMessages(data);

        // Join chat room for real-time communication
        socket.emit("join chat", user.chatId);
        selectedChatCompare = user.chatId;
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast({
          title: "Fetch Error",
          description: "There was an error fetching messages.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchMessages();
  }, [user, toast]);

  // Initialize Socket.io for real-time communication
  useEffect(() => {
    if (!socket) {
      socket = io(ENDPOINT); // Connect to Socket.io server
    }

    if (user && user._id) {
      socket.emit("setup", user); // Send user data to backend
    }

    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // Listen for new messages
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare !== newMessageReceived.chat._id
      ) {
        // Handle notification (if not currently in chat)
      } else {
        setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  // Handle sending of messages
  const handleSend = async () => {
    if (message.trim()) {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData?.token;

      if (!token) {
        toast({
          title: "Authentication Error",
          description: "No token found. Please log in.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/bb/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            content: message,
            chatId: user.chatId,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const newMessage = await response.json();
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage("");

        // Emit the new message to other users via Socket.io
        socket.emit("new message", newMessage);
      } catch (error) {
        console.error("Error sending message:", error);
        toast({
          title: "Send Error",
          description: "There was an error sending your message.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  // Handle typing indicator
  const typingHandler = (e) => {
    setMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", user.chatId);
    }

    let lastTypingTime = new Date().getTime();
    const timerLength = 3000;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", user.chatId);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <Flex direction="column" height="100vh" p={4}>
      {user ? (
        <>
          <Box
            p={4}
            borderBottomWidth="1px"
            mb={4}
            position="sticky"
            top="0"
            bg="white"
            zIndex="1"
          >
            <HStack spacing={4} justify="space-between">
              <HStack>
                <Avatar
                  name={user.name}
                  src={user.picture || "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/"}
                />
                <Box>
                  <Text fontSize="xl" fontWeight="bold">
                    {user.name}
                  </Text>
                </Box>
              </HStack>
              {/* Report Button */}
              <Button colorScheme="red" onClick={onOpen}>
                Report
              </Button>
            </HStack>
          </Box>

          <Box flex="1" overflowY="auto" mb={4}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                mb={2}
                bg={msg.sender._id === user._id ? "green.200" : "gray.200"}
                p={2}
                borderRadius="lg"
              >
                <Text>{msg.content}</Text>
              </Box>
            ))}
          </Box>

          <Input
            placeholder="Type a message..."
            value={message}
            onChange={typingHandler}
            onKeyPress={(e) => (e.key === "Enter" ? handleSend() : null)}
          />
          <Button mt={2} onClick={handleSend}>
            Send
          </Button>
        </>
      ) : (
        <Text>Select a chat to start messaging</Text>
      )}

      {/* Report Form Modal */}
      <ReportForm isOpen={isOpen} onClose={onClose} reportedUser={user} />
    </Flex>
  );
};

export default Chatbox;
