import { Injectable } from '@angular/core';
import Peer, { DataConnection } from 'peerjs';
import { BehaviorSubject } from 'rxjs';
import { filter, takeWhile } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PeerService {
  peer?: Peer = null;
  currentConnection?: DataConnection = null;

  isConnected = new BehaviorSubject(false);
  isReady = new BehaviorSubject(false);
  id = new BehaviorSubject('');

  records: any = [];

  createPeer() {
    const num =
      Math.floor(Math.random() * (999999999 - 100000000) + 100000000) + '';
    const id = `lalasync-${num}`;
    this.peer = new Peer(id, {
      // debug: 3,
      secure: true,
    });

    this.peer.on('open', (id) => {
      this.id.next(id);
      this.isReady.next(true);
    });

    // error occur, disconnect
    this.peer.on('error', (error: any) => {
      console.error('debug error', error);
      switch (error.type) {
        case 'unavailable-id':
          this.createPeer();
          return;
        default:
          this.disconnect();
      }
    });

    this.peer.on('disconnected', () => {
      this.peer.reconnect();
    });

    // someone connect to me
    this.peer.on('connection', (connection) => {
      if (this.currentConnection) {
        connection.close();
        return;
      }

      this.currentConnection = connection;
      this.isConnected.next(true);

      this.currentConnection.on('data', (data) => {
        this.handleData({ fromMe: false, content: data });
      });
      this.currentConnection.on('error', this.disconnect);
      this.currentConnection.on('close', this.disconnect);
    });
  }

  constructor() {
    this.createPeer();
  }

  // actively connect to another
  connect = (id: string) => {
    return this.isReady
      .pipe(
        takeWhile((isReady) => !isReady, true),
        filter((isReady) => isReady)
      )
      .subscribe(() => {
        this.currentConnection = this.peer.connect(id, {
          reliable: true,
        });
        this.isConnected.next(true);

        this.currentConnection.on('data', (data) => {
          this.handleData({ fromMe: false, content: data });
        });
        this.currentConnection.on('error', this.disconnect);
        this.currentConnection.on('close', this.disconnect);
      });
  };

  disconnect = () => {
    this.isConnected.next(false);
    this.currentConnection?.close();
    this.currentConnection = null;
    this.records = [];
  };

  handleData = (params: { fromMe: boolean; content: any }) => {
    const { fromMe, content } = params;

    this.records = [...this.records, { fromMe, content }];
  };

  sendMessage = (message) => {
    if (message) {
      this.currentConnection.send(message);
      this.records = [...this.records, { fromMe: true, content: message }];
    }
  };

  sendFile = (fileName, fileType, content) => {
    const data = { fileName, fileType, content };

    this.currentConnection.send(data);
    this.records = [...this.records, { fromMe: true, content: data }];
  };
}
