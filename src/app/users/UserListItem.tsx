import { DateTime } from 'luxon';
import {
  Tr,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/react';
import { User } from '../../types/user';
import { useRef, useState } from 'react';
import UserEdit from './UserEdit';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';

interface Props {
  user: User;
}

const UserListItem = ({ user }: Props) => {
  const [currentUser, setCurrentUser] = useState<User>(user);

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate } = useSWR(`${process.env.ApiUrl}/api/users?page=1`, fetcher);

  const handleEditUser = async (name: string): Promise<void> => {
    const response = await fetch(`${process.env.ApiUrl}/api/users/${currentUser.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ name }),
    });
    const { result, id } = await response.json();

    // NOTE: 추후 사용자 생성 후 mutate를 통해 user 목록을 다시 렌더링 합니다.
    // NOTE: api가 없기 때문에 지금은 mutate를 한 후 사용자를 맨 앞에 추가합니다.
    if (result) {
      await mutate();
      setCurrentUser({ ...currentUser, name });
      onClose();
    }
  };

  return (
    <>
      <Tr>
        <Td>{currentUser.email}</Td>
        <Td>{currentUser.name}</Td>
        <Td>{DateTime.fromISO(currentUser.last_login_at).toFormat('yyyy-MM-dd HH:mm:ss')}</Td>
        <Td textAlign="center">
          <Button size="sm" colorScheme="blue" variant="ghost" onClick={onOpen}>
            수정
          </Button>
        </Td>
      </Tr>

      <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>사용자 수정</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <UserEdit initialRef={initialRef} user={user} onClose={onClose} onEdit={handleEditUser} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserListItem;
