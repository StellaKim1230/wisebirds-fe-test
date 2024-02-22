'use client';

import { Table, Thead, Tbody, Tr, Th, TableContainer, Center } from '@chakra-ui/react';
import { User } from '../../types/user';
import UserListItem from './UserListItem';
import { Pagination } from '../../components/Pagination';
import { defaultSize } from '../../constants';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

interface Props {
  users: User[];
  page: number;
  totalCount: number;
}

const UserListTable = ({ users, page, totalCount }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [currentUsers, setCurrentUsers] = useState<User[]>(users);

  const handlePageChange = async (page: number) => {
    router.replace(`${pathname}?page=${page}`);
    const response = await fetch(`${process.env.ApiUrl}/api/users?page=${page}`);
    const campaigns = await response.json();
    setCurrentUsers(campaigns.content);
  };

  return (
    <>
      <TableContainer maxHeight="calc(100vh - 240px)" overflowY="auto" marginBottom="16px">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>아이디</Th>
              <Th>이름</Th>
              <Th>마지막 로그인 일시</Th>
              <Th textAlign="center">수정</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentUsers.map((user) => (
              <UserListItem key={user.id} user={user} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Center height="40px">
        <Pagination total={totalCount} size={defaultSize} page={page} setPage={handlePageChange} />
      </Center>
    </>
  );
};

export default UserListTable;
