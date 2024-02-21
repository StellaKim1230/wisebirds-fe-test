'use client';

import { ChakraProvider as Providers } from '@chakra-ui/react';

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
