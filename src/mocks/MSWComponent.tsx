'use client';

import { useEffect, useState } from 'react';

export const MSWComponent = ({ children }: { children: React.ReactNode }) => {
  const [mswReady, setMswReady] = useState(false);
  const isDev = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled';

  const init = async () => {
    if (isDev) {
      const initMsw = await import('./index').then((res) => res.initMsw);
      await initMsw();
      setMswReady(true);
    }
  };

  useEffect(() => {
    if (mswReady) return;
    init();
  }, [mswReady]);

  if (!isDev) return null;

  return <>{children}</>;
};
