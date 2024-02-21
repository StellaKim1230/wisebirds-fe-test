import Header from '../components/Header';
import { MSWComponent } from '../mocks/MSWComponent';
import { ChakraProvider } from './providers';

export const metadata = {
  title: '와이즈버즈 프론트엔드 과제',
  description: '와이즈버즈 프론트엔드 과제입니다.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <MSWComponent>
            <Header />
            <main>{children}</main>
          </MSWComponent>
        </ChakraProvider>
      </body>
    </html>
  );
}
