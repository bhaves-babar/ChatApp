import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, useToast, Spinner } from '@chakra-ui/react';
import SingleChat from '../FunctionComponents/SingleChat';
import Chatbox from './ChatBox';

const MyChat = () => {
  const [chats, setChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchChats = async () => {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const token = userData?.token;
      const loggedInUserId = userData?._id;

      if (!token) {
        toast({
          title: 'Authentication Error',
          description: 'No token found. Please log in.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/bb/chats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filteredChats = response.data.map(chat => ({
          ...chat,
          users: chat.users.filter(user => user._id !== loggedInUserId),
          chatId: chat._id,
        }));

        setChats(filteredChats);
      } catch (error) {
        console.error('Error fetching chats:', error);
        toast({
          title: 'Fetch Error',
          description: 'There was an error fetching chat data.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [toast]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box display="flex" p={4}>
      <Box width="30%">
        {chats.map((chat) =>
          chat.users.map((user) => (
            <SingleChat key={user._id} user={user} chatId={chat.chatId} onSelectUser={setSelectedUser} />
          ))
        )}
      </Box>
      <Box width="70%">
        <Chatbox user={selectedUser} />
      </Box>
    </Box>
  );
};

export default MyChat;
