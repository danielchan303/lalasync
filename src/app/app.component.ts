import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { PeerService } from './services/peer.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  showAds = false;
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
        if (isConnected) {
          this.showAds = true;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.isConnectedSub.unsubscribe();
  }

  closeAds() {
    this.showAds = false;
  }
}
