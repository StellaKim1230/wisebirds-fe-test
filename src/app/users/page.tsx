import { use } from 'react';
import { Text, Box, Divider } from '@chakra-ui/react';
import UserListTable from './UserListTable';
import { ResponseUsers } from '../../types/user';
import { defaultPage } from '../../constants';

async function getUsers(page: number) {
  const response = await fetch(`${process.env.ApiUrl}/api/users?page=${page}`);
  const users = await response.json();
  return users;
}

export default function UsersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page) || defaultPage;
  const users: ResponseUsers = use(getUsers(page));

  return (
    <Box padding="16px">
      <Text as="h2" fontWeight="bold" marginBottom="16px">
        사용자 관리
      </Text>
      <Divider marginBottom="16px" />
      <UserListTable users={users.content} page={page} totalCount={users.total_elements} />
    </Box>
  );
}
