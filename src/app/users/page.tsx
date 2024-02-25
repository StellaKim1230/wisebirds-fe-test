import { use } from 'react';
import { Text, Box, Divider } from '@chakra-ui/react';
import UserListTable from './UserListTable';
import ErrorBoundary from '../../components/ErrorBoundary';
import { ResponseUsers } from '../../types/user';
import { defaultStartPage } from '../../constants';

async function getUsers(page: number) {
  try {
    const response = await fetch(`${process.env.ApiUrl}/api/users?page=${page}`);
    const users = await response.json();
    return users;
  } catch (error) {
    throw new Error();
  }
}

export default function UsersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = Number(searchParams.page) || defaultStartPage;
  const users: ResponseUsers = use(getUsers(page));

  return (
    <Box padding="16px">
      <Text as="h2" fontWeight="bold" marginBottom="16px">
        사용자 관리
      </Text>
      <Divider marginBottom="16px" />
      <ErrorBoundary>
        <UserListTable users={users.content} page={page} totalCount={users.total_elements} />
      </ErrorBoundary>
    </Box>
  );
}
