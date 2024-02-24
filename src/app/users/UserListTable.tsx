'use client';

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Center,
  Button,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import useSWR from 'swr';
import { RequestUser, User } from '../../types/user';
import UserListItem from './UserListItem';
import { Pagination } from '../../components/Pagination';
import { defaultSize } from '../../constants';
import { useRouter, usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import UserCreate from './UserCreate';
import { fetcher } from '../../utils/fetcher';

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

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate } = useSWR(`${process.env.ApiUrl}/api/users?page=1`, fetcher);

  const handleCreateUser = async (request: RequestUser): Promise<void> => {
    const response = await fetch(`${process.env.ApiUrl}/api/users`, {
      method: 'POST',
      body: JSON.stringify(request),
    });
    const { result, id } = await response.json();

    // NOTE: 추후 사용자 생성 후 mutate를 통해 user 목록을 다시 렌더링 합니다.
    // NOTE: api가 없기 때문에 지금은 mutate를 한 후 사용자를 맨 앞에 추가합니다.
    if (result) {
      await mutate();
      const newUser = { id, email: request.email, name: request.name, last_login_at: new Date().toString() };
      setCurrentUsers([newUser, ...currentUsers]);
      onClose();
    }
  };

  return (
    <>
      <Button size="sm" fontWeight="bold" colorScheme="blue" onClick={onOpen}>
        생성
      </Button>
      <Divider marginTop="16px" />
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

      <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>사용자 생성</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <UserCreate initialRef={initialRef} onClose={onClose} onCreate={handleCreateUser} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserListTable;
