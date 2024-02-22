import { DateTime } from 'luxon';
import { Tr, Td, Button } from '@chakra-ui/react';
import { User } from '../../types/user';

interface Props {
  user: User;
}

const UserListItem = ({ user }: Props) => {
  return (
    <Tr>
      <Td>{user.email}</Td>
      <Td>{user.name}</Td>
      <Td>{DateTime.fromISO(user.last_login_at).toFormat('yyyy-MM-dd HH:mm:ss')}</Td>
      <Td textAlign="center">
        <Button size="sm" colorScheme="blue" variant="ghost">
          수정
        </Button>
      </Td>
    </Tr>
  );
};

export default UserListItem;
