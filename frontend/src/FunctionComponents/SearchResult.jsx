import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import AddUsers from './AddUser';

const SearchResult = ({ users }) => {
  return (
    <Box mt={4}>
      {users.map((user, index) => (
        <Box key={index} p={4} borderWidth="1px" borderRadius="md" mb={2}>
          <Text>{user.name}</Text>
          {/* Pass the user's _id to the AddUsers component */}
          <AddUsers userId={user._id} />
        </Box>
      ))}
    </Box>
  );
};

export default SearchResult;
