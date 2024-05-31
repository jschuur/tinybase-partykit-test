import * as Party from 'partykit/server';
import { createStore } from 'tinybase';
import {
  TinyBasePartyKitServer,
  hasStoreInStorage,
} from 'tinybase/persisters/persister-partykit-server';

export default class Server extends TinyBasePartyKitServer {
  constructor(readonly room: Party.Room) {
    super(room);

    createStore().setValue('hello', 'server');
  }

  async onStart() {
    console.log('Party started!');

    const hasStore = await hasStoreInStorage(this.room.storage);

    console.log('hasStoreInStorage', hasStore);
    if (hasStore) {
      const storeData = await this.room.storage.list();

      console.log({ storeData });
    }
  }

  onConnect(connection: Party.Connection) {
    console.log('Connected', connection.id);

    // connection.send('hello from server');
  }

  onRequest(request: Party.Request) {
    return super.onRequest(request);
  }

  onMessage(message: string, connection: Party.Connection) {
    console.log(`connection ${connection.id} sent message: ${message}`);

    this.room.broadcast(`${connection.id}: ${message}`, [connection.id]);

    return super.onMessage(message, connection);
  }
}

Server satisfies Party.Worker;
