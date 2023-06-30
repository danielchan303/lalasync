import { Injectable } from '@angular/core';
import Peer, { DataConnection } from 'peerjs';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PeerService {
  peer?: Peer = null;
  currentConnection?: DataConnection = null;
  isReady = new BehaviorSubject(false);

  records = [];

  id = '';

  handleData(params: { fromMe: boolean; content: any }) {
    const { fromMe, content } = params;

    this.records.push({ fromMe, content });
  }

  handleDisconnect() {
    this.currentConnection?.close();
    this.currentConnection = null;
    this.records = [];
  }

  constructor() {
    this.peer = new Peer({
      debug: 3,
    });

    this.peer.on('open', (id) => {
      this.id = id;
      this.isReady.next(true);
    });

    // error occur, disconnect
    this.peer.on('error', (error) => {
      console.error('error', error);
      this.currentConnection = null;
      this.records = [];
    });

    // someone connect to me
    this.peer.on('connection', (connection) => {
      this.currentConnection = connection;

      this.currentConnection.on('data', (data) => {
        this.handleData({ fromMe: false, content: data });
      });

      this.currentConnection.on('error', this.handleDisconnect);
      this.currentConnection.on('close', this.handleDisconnect);
    });
  }

  // actively connect to another
  connect(id) {
    this.isReady.pipe(first()).subscribe((isReady) => {
      if (isReady) {
        this.currentConnection = this.peer.connect(id, {
          reliable: true,
        });

        this.currentConnection.on('data', (data) => {
          this.handleData({ fromMe: false, content: data });
        });

        this.currentConnection.on('error', this.handleDisconnect);
        this.currentConnection.on('close', this.handleDisconnect);
      }
    });
  }

  sendMessage(message) {
    this.currentConnection.send(message);
    this.records.push({ fromMe: true, content: message });
  }

  sendFile(fileName, content) {
    this.currentConnection.send({ fileName, content });
    this.records.push({ fromMe: true, content: { fileName, content } });
  }
}
