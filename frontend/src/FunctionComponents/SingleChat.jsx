import React from 'react';
import { Box, Avatar, Text, HStack } from '@chakra-ui/react';

const SingleChat = ({ user, chatId, onSelectUser }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" mb={2} onClick={() => onSelectUser({ ...user, chatId })} cursor="pointer">
      <HStack spacing={4}>
        <Avatar name={user.name} src={user.picture } />
        <Box>
          <Text>{user.name}</Text>
          <Text fontSize="sm" color="gray.500">Chat ID: {chatId}</Text>
        </Box>
      </HStack>
    </Box>
  );
};

export default SingleChat;
