import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Subscription } from 'rxjs';
import { PeerService } from 'src/app/services/peer.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent implements OnInit, OnDestroy {
  @ViewChild('scanner', { static: false }) scanner: ZXingScannerComponent;
  scanEnabled = true;

  id = '';
  cameraFound = false;
  isReadySubscription: Subscription;

  constructor(
    private peerService: PeerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  connect() {
    if (this.id) {
      console.log('connect id ', this.id);
      this.isReadySubscription = this.peerService.connect(this.id);
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.connect();
  }

  ngOnDestroy(): void {
    if (this.isReadySubscription) {
      this.isReadySubscription.unsubscribe();
    }
  }

  scanSuccessHandler(qrContent: string) {
    const id = qrContent.split('/').slice(-1)[0];
    this.id = id;
    this.scanEnabled = false;
    this.connect();
  }
}
