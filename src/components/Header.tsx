'use client';

import NextLink from 'next/link';
import {
  Link as ChakraLink,
  Flex,
  Center,
  Select,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Text,
} from '@chakra-ui/react';
import { Member } from '../types/member';

interface Props {
  me: Member;
}

const Header = ({ me }: Props) => {
  return (
    <Flex as="nav" bg="blue.400" width="100%" padding="0 16px" justifyContent="space-between" alignItems="center">
      <Flex as="ul" style={{ listStyle: 'none' }}>
        <Center as="li" padding="0 16px 0 0" height="48px">
          <ChakraLink color="white" as={NextLink} href="/">
            Wisebirds
          </ChakraLink>
        </Center>
        <Center as="li" padding="0 16px" height="48px">
          <ChakraLink color="white" as={NextLink} href="/campaigns">
            캠페인
          </ChakraLink>
        </Center>
        <Center as="li" padding="0 16px" height="48px">
          <ChakraLink color="white" as={NextLink} href="/users">
            사용자
          </ChakraLink>
        </Center>
      </Flex>
      <Flex>
        <Popover placement="bottom-end">
          <PopoverTrigger>
            <Center as="span" padding="0 16px" height="48px" color="white">
              {me.email}
            </Center>
          </PopoverTrigger>
          <PopoverContent width="auto" textAlign="center">
            <PopoverArrow />
            <PopoverHeader>
              <Text color="gray.600" fontSize="16px">
                {me.name}
              </Text>
            </PopoverHeader>
            <PopoverBody>
              <Text color="gray.400" fontSize="12px">
                {me.email}
              </Text>
              <Text color="gray.400" fontSize="12px">
                {me.company.name}
              </Text>
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <Center>
          <Select color="white" width="120px">
            <option value="admin">어드민</option>
            <option value="manager">매니저</option>
            <option value="viewer">뷰어</option>
          </Select>
        </Center>
      </Flex>
    </Flex>
  );
};

export default Header;
