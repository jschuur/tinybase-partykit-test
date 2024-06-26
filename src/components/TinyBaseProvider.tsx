'use client';

import PartySocket from 'partysocket';
import { createStore } from 'tinybase';
import {
  createPartyKitPersister,
  PartyKitPersister,
} from 'tinybase/persisters/persister-partykit-client';
import { Provider, useCreatePersister } from 'tinybase/ui-react';

import { partyKitHost, roomId } from '@/config';

type Props = {
  children: React.ReactNode;
};
export const store = createStore();

export default function TinyBaseProvider({ children }: Props) {
  useCreatePersister(
    store,
    (store) =>
      createPartyKitPersister(store, new PartySocket({ host: partyKitHost!, room: roomId }), {
        storeProtocol: 'http',
      }),
    [],
    async (persister: PartyKitPersister) => {
      await persister.startAutoLoad({}, {});
      await persister.startAutoSave();
    }
  );

  return <Provider store={store}>{children}</Provider>;
}
