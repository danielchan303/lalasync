import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import scrollIntoView from 'scroll-into-view-if-needed';

@Component({
  selector: 'app-message-bubble',
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss'],
})
export class MessageBubbleComponent implements OnChanges, AfterViewInit {
  @Input() @HostBinding('class.fromMe') fromMe: boolean;
  @Input() content: any;
  @Input() isLast: boolean;

  dataUrl: string;
  isText: boolean;
  isImage: boolean;
  isVideo: boolean;
  isAudio: boolean;

  constructor(private elementRef: ElementRef, private _lightbox: Lightbox) {}

  ngAfterViewInit(): void {
    if (this.isLast) {
      setTimeout(() => {
        scrollIntoView(this.elementRef.nativeElement, {
          scrollMode: 'if-needed',
          block: 'end',
        });
      }, 200);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('bubble on change', changes);
    this.isText = typeof this.content === 'string';
    console.log('fileType', this.content);
    this.isImage = this.content.fileType?.startsWith('image/');
    this.isVideo = this.content.fileType?.startsWith('video/');
    this.isAudio = this.content.fileType?.startsWith('audio/');

    this.dataUrl = this.getHref();
  }

  getHref() {
    // Create a new Blob object from the ArrayBuffer
    const blob = new Blob([this.content.content]);

    // Create a data URL from the Blob object
    const dataUrl = URL.createObjectURL(blob);

    return dataUrl;
  }

  openLightbox(index: number): void {
    // open lightbox
    this._lightbox.open([{ src: this.dataUrl, thumb: this.dataUrl }], 0, {
      centerVertically: true,
      disableScrolling: true,
    });
  }

  videoPreview(video: HTMLVideoElement) {
    video.currentTime = 0.0;
  }
}
