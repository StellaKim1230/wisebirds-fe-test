import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react';
import { User } from '../../types/user';
import UserListItem from './UserListItem';

interface Props {
  users: User[];
}

const UserListTable = ({ users }: Props) => {
  return (
    <TableContainer maxHeight="calc(100vh - 200px)" overflowY="auto">
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
          {users.map((user) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UserListTable;
