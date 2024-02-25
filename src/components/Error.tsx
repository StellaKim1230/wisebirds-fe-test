import { useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Text,
} from '@chakra-ui/react';

const Error = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody padding="24px">
          <Text display="block">에러가 발생했습니다.</Text>
          <Text display="block">같은 현상이 반복되면 고객센터로 문의 바랍니다.</Text>

          <br />
          <Text display="block">* 고객센터</Text>
          <Text display="block">- email: helpdesk@wisebirds.ai</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Error;
