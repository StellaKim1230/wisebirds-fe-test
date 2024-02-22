import { use } from 'react';
import { Text, Box, Divider, Button } from '@chakra-ui/react';
import UserListTable from './UserListTable';
import { ResponseUsers } from '../../types/user';

async function getUsers() {
  const response = await fetch(`${process.env.ApiUrl}/api/users`);
  const users = await response.json();
  return users;
}

export default function UsersPage() {
  const users: ResponseUsers = use(getUsers());

  return (
    <Box padding="16px">
      <Text as="h2" fontWeight="bold" marginBottom="16px">
        사용자 관리
      </Text>
      <Divider marginBottom="16px" />
      <Button size="sm" fontWeight="bold" colorScheme="blue">
        생성
      </Button>
      <Divider marginTop="16px" />
      <UserListTable users={users.content} />
    </Box>
  );
}
