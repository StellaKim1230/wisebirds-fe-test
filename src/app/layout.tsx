import { use } from 'react';
import { MSWComponent } from '../mocks/MSWComponent';
import { ChakraProvider } from './providers';
import Header from '../components/Header';
import { Member } from '../types/member';

export const metadata = {
  title: '와이즈버즈 프론트엔드 과제',
  description: '와이즈버즈 프론트엔드 과제입니다.',
};

async function getMe() {
  const response = await fetch(`${process.env.API_URL}/api/auth/me`);
  const me = await response.json();
  return me;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const me: Member = use(getMe());

  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <MSWComponent>
            <Header me={me} />
            <main style={{ height: 'calc(100vh - 48px)', paddingTop: 48 }}>{children}</main>
          </MSWComponent>
        </ChakraProvider>
      </body>
    </html>
  );
}
