import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { first } from 'rxjs';
import { PeerService } from 'src/app/services/peer';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent implements OnInit {
  @ViewChild('scanner', { static: false }) scanner: ZXingScannerComponent;
  scanEnabled = true;

  id = '';
  cameraFound = false;

  constructor(
    private peerService: PeerService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  connect() {
    if (this.id) {
      this.peerService.isReady.pipe(first()).subscribe((isReady) => {
        if (isReady) {
          this.peerService.connect(this.id);
          this.router.navigate(['/']);
        }
      });
    }
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.connect();
  }

  scanSuccessHandler(id) {
    this.id = id;
    this.scanEnabled = false;
    this.connect();
  }
}
