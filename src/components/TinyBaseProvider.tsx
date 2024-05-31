'use client';

import PartySocket from 'partysocket';
import { createStore } from 'tinybase';
import { createPartyKitPersister } from 'tinybase/persisters/persister-partykit-client';
import { Provider, useCreatePersister } from 'tinybase/ui-react';

import { partyKitUrl, roomId } from '@/config';

type Props = {
  children: React.ReactNode;
};
export const store = createStore().setValue('hello', 'client');

export default function TinyBaseProvider({ children }: Props) {
  useCreatePersister(
    store,
    (store) =>
      createPartyKitPersister(store, new PartySocket({ host: partyKitUrl!, room: roomId })),
    [roomId]
  );

  return <Provider store={store}>{children}</Provider>;
}
