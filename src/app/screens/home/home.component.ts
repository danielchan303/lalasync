import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PeerService } from 'src/app/services/peer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('dialog') dialog: ElementRef;
  idSubscription: Subscription;

  qrContent = '';
  inputMessage = '';

  id: string;

  getRecords() {
    return this.peerService.records;
  }

  isConnected() {
    return !!this.peerService.currentConnection;
  }

  constructor(private peerService: PeerService) {}

  ngOnInit(): void {
    this.idSubscription = this.peerService.id.subscribe((id) => {
      this.id = id;
      this.qrContent = `${window.location.origin}/connect/${this.id}`;
    });
  }

  ngOnDestroy(): void {
    this.idSubscription.unsubscribe();
  }

  fileChangeHandler(input: HTMLInputElement) {
    const fileList = input.files;

    console.log('fileList', input);

    for (var i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const reader = new FileReader();

      reader.addEventListener(
        'load',
        () => {
          const result = reader.result;
          this.peerService.sendFile(file.name, file.type, result);
        },
        false
      );
      reader.readAsArrayBuffer(file);
    }
  }

  sendMessage(form: NgForm) {
    this.peerService.sendMessage(form.value.message);
    this.inputMessage = '';
  }
}
