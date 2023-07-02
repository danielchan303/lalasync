import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PeerService } from './services/peer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isConnected: boolean;
  isConnectedSub: Subscription;

  constructor(private peerService: PeerService) {}

  disconnect() {
    this.peerService.disconnect();
  }

  ngOnInit(): void {
    this.isConnectedSub = this.peerService.isConnected.subscribe(
      (isConnected) => {
        this.isConnected = isConnected;
      }
    );
  }

  ngOnDestroy(): void {
    this.isConnectedSub.unsubscribe();
  }
}
