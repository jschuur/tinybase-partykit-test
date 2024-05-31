import * as Party from 'partykit/server';
import { createStore } from 'tinybase';
import { TinyBasePartyKitServer } from 'tinybase/persisters/persister-partykit-server';

export default class Server extends TinyBasePartyKitServer {
  constructor(readonly room: Party.Room) {
    super(room);

    createStore().setValue('hello', 'server');
  }

  onStart() {
    console.log('Party started!');
  }

  onConnect(connection: Party.Connection) {
    console.log('Connected', connection.id);

    connection.send('hello from server');
  }

  onMessage(message: string, connection: Party.Connection) {
    console.log(`connection ${connection.id} sent message: ${message}`);

    this.room.broadcast(`${connection.id}: ${message}`, [connection.id]);

    return super.onMessage(message, connection);
  }
}

Server satisfies Party.Worker;
