import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { YOUTUBE_CHANNEL_URL_PREFIX, YOUTUBE_VIDEO_PLAYER_EMBED_URL_PREFIX } from 'src/app/services/youtube/constants/youtube.constants';
import { Schema$SearchResult } from 'src/app/services/youtube/models/youtube.models';
import { DEFAULT_VIDEO_PLAYER_DIMENSIONS } from './constants/home-modal.constants';
import { IVideoPlayerDimensions } from './models/home-modal.models';

@Component({
  selector: 'app-home-modal',
  templateUrl: './home-modal.component.html',
  styleUrls: ['./home-modal.component.scss'],
})
export class HomeModalComponent implements OnInit {
  @ViewChild('videoPlayerContainer') videoPlayerContainer: ElementRef;
  @Input() item: Schema$SearchResult;

  videoPlayerDimensions: IVideoPlayerDimensions = DEFAULT_VIDEO_PLAYER_DIMENSIONS;
  videoPlayerUrl: SafeResourceUrl;

  constructor(private modalController: ModalController, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    console.log('this.item: ', this.item);
    this.videoPlayerUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(YOUTUBE_VIDEO_PLAYER_EMBED_URL_PREFIX + this.item.id?.videoId);
  }

  ngAfterViewInit () {
    setTimeout(() => {
      if (this.videoPlayerContainer) {
        Promise.resolve().then(() => {
          const height = (this.videoPlayerContainer.nativeElement as HTMLElement).offsetHeight;
          const width = (this.videoPlayerContainer.nativeElement as HTMLElement).offsetWidth;
          if (height && width) {
            this.videoPlayerDimensions = {
              height: this.videoPlayerContainer.nativeElement.clientHeight,
              width: this.videoPlayerContainer.nativeElement.clientWidth
            }
          }
        });
      }
    }, 500);
  }

  openChannel(channelId: string): void {
    setTimeout(() => {
      window.open(YOUTUBE_CHANNEL_URL_PREFIX + channelId, "_blank");
    }, 250);
  }

  close(): void {
    this.modalController.dismiss();
  }

}
