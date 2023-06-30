import { Component, OnInit, ViewChild } from '@angular/core';
import { PeerService } from './services/peer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public peerService: PeerService) {}

  ngOnInit(): void {}
}
