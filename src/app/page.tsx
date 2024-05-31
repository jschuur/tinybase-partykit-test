'use client';

import { useValue } from 'tinybase/ui-react';
import { StoreInspector } from 'tinybase/ui-react-dom';

import PartyKit from '@/components/PartyKit';
import TinyBaseProvider, { store } from '@/components/TinyBaseProvider';

export default function Home() {
  const hello = useValue('hello', store);

  return (
    <TinyBaseProvider>
      <PartyKit />
      <main className='flex min-h-screen flex-col items-center justify-between p-4'>
        Hello {hello}
      </main>
      <StoreInspector />
    </TinyBaseProvider>
  );
}
