import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import { Subscription, filter, takeWhile } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { PeerService } from 'src/app/services/peer.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent implements OnInit, AfterViewInit, OnDestroy {
  scanEnabled = true;

  id = '';
  scanner: Html5Qrcode;
  cameraLoading = true;
  checkCameraIsReadyInterval: any;
  isReadySubscription: Subscription;
  isConnectedSubscription: Subscription;

  constructor(
    private peerService: PeerService,
    private route: ActivatedRoute,
    private router: Router,
    private globalService: GlobalService
  ) {}

  connect() {
    if (this.id) {
      console.log('connect id ', this.id);
      this.isReadySubscription = this.peerService.connect(this.id);
      this.isConnectedSubscription = this.peerService.isConnected
        .pipe(
          takeWhile((isConnected) => !isConnected, true),
          filter((isConnected) => isConnected)
        )
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }

  ngOnInit(): void {
    this.globalService.hideGuide();
    this.id = this.route.snapshot.params['id'];

    this.connect();
  }

  ngAfterViewInit(): void {
    this.scanner = new Html5Qrcode('reader');
    this.checkCameraIsReadyInterval = setInterval(() => {
      if (this.scanner.getState() === Html5QrcodeScannerState.SCANNING) {
        setTimeout(() => {
          this.cameraLoading = false;
        }, 500);
        clearInterval(this.checkCameraIsReadyInterval);
      }
    }, 500);

    this.scanner.start(
      { facingMode: 'environment' },
      {
        fps: 10,
        aspectRatio: 1,
      },
      (decodedText) => {
        this.scanner.stop().then(() => {
          this.scanSuccessHandler(decodedText);
        });
      },
      (error) => {}
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.checkCameraIsReadyInterval);
    this.isReadySubscription?.unsubscribe();
    this.isConnectedSubscription?.unsubscribe();

    if (this.scanner.getState() === Html5QrcodeScannerState.SCANNING) {
      this.scanner.stop().then(() => {
        this.scanner.clear();
      });
    } else {
      this.scanner.clear();
    }
  }

  scanSuccessHandler(qrContent: string) {
    const id = qrContent.split('/').slice(-1)[0];
    this.id = id;
    this.scanEnabled = false;
    this.connect();
  }
}
