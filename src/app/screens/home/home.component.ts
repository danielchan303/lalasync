import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PeerService } from 'src/app/services/peer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('files') filesInput: ElementRef;

  records = this.peerService.records;
  inputMessage = '';

  get connected() {
    // return true;
    return !!this.peerService.currentConnection;
  }

  constructor(public peerService: PeerService) {}

  fileChangeHandler() {
    const fileList = this.filesInput.nativeElement.files;
    console.log('fileList', fileList);

    for (let file of fileList) {
      const reader = new FileReader();

      reader.addEventListener(
        'load',
        () => {
          const result = reader.result;
          console.log('result', result);
          this.peerService.sendFile(file.name, result);
        },
        false
      );
      reader.readAsArrayBuffer(file);
    }
  }

  sendMessage(form: NgForm) {
    console.log('form', form.value);
    this.peerService.sendMessage(form.value.message);
    this.inputMessage = '';
  }
}
