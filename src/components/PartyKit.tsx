import usePartySocket from 'partysocket/react';

import { partyKitHost, roomId } from '@/config';

export default function PartyKit() {
  usePartySocket({
    host: partyKitHost,
    room: roomId,

    onOpen() {
      console.log('Connection established');
    },

    async onMessage(event: MessageEvent) {
      console.log('Server message received: ', event.data);
    },

    onClose() {
      console.log('Connection closed');
    },

    onError(e) {
      const message = JSON.stringify(e);

      console.error(`Connection error: ${message}`);
    },
  });

  return null;
}
