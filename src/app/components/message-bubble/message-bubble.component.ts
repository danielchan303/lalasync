import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss'],
})
export class MessageBubbleComponent implements OnChanges {
  @Input() @HostBinding('class.fromMe') fromMe: boolean;
  @Input() content: any;

  dataUrl: string;
  isText: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('bubble on change', changes);
    this.dataUrl = this.getHref();
    this.isText = typeof this.content === 'string';
  }

  getHref() {
    // Create a new Blob object from the ArrayBuffer
    const blob = new Blob([this.content.content]);

    // Create a data URL from the Blob object
    const dataUrl = URL.createObjectURL(blob);

    return dataUrl;
  }
}
