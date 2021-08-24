import { Component } from '@angular/core';
import { IonCheckbox, ModalController, PopoverController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { YOUTUBE_VIDEO_URL_PREFIX } from '../services/youtube/constants/youtube.constants';
import { Schema$SearchResult } from '../services/youtube/models/youtube.models';
import { YoutubeService } from '../services/youtube/youtube.service';
import { HomeModalComponent } from './components/home-modal/home-modal.component';
import { HomePopoverComponent } from './components/home-popover/home-popover.component';
import { CHECKBOX_ID_PREFIX, POPOVER_BTN_DETAILS_ID, POPOVER_BTN_DOWNLOAD_ID, POPOVER_BTN_WATCH_ID, POPOVER_BUTTONS } from './constants/home.constants';
import { ISelectedItem } from './models/home.models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  actualPage: number;
  actualSearchKeyword: string;

  searchResults$: Observable<any>;
  selectedVideos: Set<ISelectedItem>;

  checkboxIdPrefix = CHECKBOX_ID_PREFIX;

  constructor(
    private youtubeService: YoutubeService, private popoverController: PopoverController,
    private modalController: ModalController
  ) {
    this.selectedVideos = new Set();

    // this.searchResults$ = of(mockedData);
    this.actualPage = 1;
  }

  onPageReload(): void {
    window.location.reload();
  }

  onSearch(event: any): void {
    this.actualSearchKeyword = event.detail?.value;
    this.actualPage = 1;
    if (this.actualSearchKeyword) {
      this.searchResults$ = this.youtubeService.search(this.actualSearchKeyword);
      this.searchResults$.subscribe(res => console.log('res: ', res));
    } else {
      this.searchResults$ = of({});
    }
  }

  onPaging(pageToken: string, additive: number): void {
    this.searchResults$ = this.youtubeService.search(this.actualSearchKeyword, pageToken);
    this.actualPage += additive;
  }

  openVideo(id: string) {
    setTimeout(() => {
      window.open(YOUTUBE_VIDEO_URL_PREFIX + id, "_blank");
    }, 250);
  }

  onCheckboxClick(id: string, title?: string, checkboxId?: string, event?: any): void {
    if (event) { event.stopPropagation(); }
    const found = this.findSetElement(id);
    if (found) {
      this.selectedVideos.delete(found);
    } else {
      this.selectedVideos.add({ id, title, checkboxId });
    }
  }

  clearSelectedVideos(): void {
    this.selectedVideos.forEach(selectedVideo => {
      this.removeFromSet(selectedVideo);
    });
  }

  downloadSelectedVideos(): void {
    console.log('TODO');
  }

  download(selectedVideo: ISelectedItem): void {
    this.youtubeService.download(selectedVideo.id, selectedVideo.title, 'mp3');
  }

  findSetElement(id: string): ISelectedItem {
    return Array.from(this.selectedVideos.values()).find(el => el.id === id);
  }

  removeFromSet(selectedVideo: ISelectedItem): void {
    this.selectedVideos.delete(selectedVideo);
    this.getHTMLElementAsCheckbox(selectedVideo.checkboxId).checked = false;
  }

  getHTMLElementAsCheckbox(checkboxId: string): IonCheckbox {
    return (document.getElementById(checkboxId) as unknown as IonCheckbox);
  }

  async openPopover(event: any, item: Schema$SearchResult): Promise<void> {
    if (event) { event.stopPropagation(); }

    const popover = await this.popoverController.create({
      component: HomePopoverComponent,
      componentProps: {
        buttons: POPOVER_BUTTONS,
        videoId: item.id?.videoId
      },
      event: event
    });
    await popover.present();

    const res = await popover.onDidDismiss();

    if (res.role !== 'backdrop') {
      if (res.data.id === POPOVER_BTN_DOWNLOAD_ID) {
        this.download(res.data.videoId);
      } else if (res.data.id === POPOVER_BTN_WATCH_ID) {
        this.openVideo(res.data.videoId);
      } else if (res.data.id === POPOVER_BTN_DETAILS_ID) {
        console.log('TODO');
        this.openModal(item);
      }
    }
  }

  async openModal(item: Schema$SearchResult) {
    const modal = await this.modalController.create({
      component: HomeModalComponent,
      componentProps: {
        item
      }
    });
    return await modal.present();
  }



}

export const mockedData = {
  "items": [
    {
      "kind": "youtube#searchResult",
      "etag": "Ahf_WjX3tIZbIGKNqL624gsGKYs",
      "id": {
        "kind": "youtube#video",
        "videoId": "IjSXP1d1_2E"
      },
      "snippet": {
        "publishedAt": "2021-07-26T12:44:23Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "✅Iratkozz fel! Boros Öcsi Live Music!💯‼️🤪🤣🥳",
        "description": "This stream is created with #PRISMLiveStudio.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/IjSXP1d1_2E/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/IjSXP1d1_2E/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/IjSXP1d1_2E/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-07-26T12:44:23Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "tdm-jtFUAMuzS1QmGD9s6D2OD2I",
      "id": {
        "kind": "youtube#video",
        "videoId": "-RmHlvJVXfw"
      },
      "snippet": {
        "publishedAt": "2021-07-20T19:43:56Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "✅ Július 20 Live Music! Boros Öcsivel💯‼️🤪🤣🥳",
        "description": "This stream is created with #PRISMLiveStudio.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/-RmHlvJVXfw/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/-RmHlvJVXfw/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/-RmHlvJVXfw/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-07-20T19:43:56Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "KdMLzLXn5wCtPDxPz5LeenBZVe4",
      "id": {
        "kind": "youtube#video",
        "videoId": "Uz7S5xyUkCM"
      },
      "snippet": {
        "publishedAt": "2021-01-06T20:03:17Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "Boros Öcsi ♨️ Ábrándos szép napok🥳 Egy jó asszony🥰 Hozd el azt a napot ✅ Republic",
        "description": "IratkozzFel #Subscribe #BorosÖcsi IRATKOZZ FEL A CSATORNÁMRA ES NYOMD MEG A CSENGÕT!!! Amennyiben szereted és támogatod a munkásságom, ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/Uz7S5xyUkCM/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/Uz7S5xyUkCM/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/Uz7S5xyUkCM/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-01-06T20:03:17Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "bQ4y78V0DyzW-NHFu2xPe-q0ix8",
      "id": {
        "kind": "youtube#video",
        "videoId": "eO6AIY4DaSg"
      },
      "snippet": {
        "publishedAt": "2021-07-21T18:44:32Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "✅ Július 21 Live Music!💯‼️🤪🤣🥳",
        "description": "This stream is created with #PRISMLiveStudio.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/eO6AIY4DaSg/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/eO6AIY4DaSg/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/eO6AIY4DaSg/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-07-21T18:44:32Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "EaHI8m6AEnf0qHHTVSqWNfjdyc8",
      "id": {
        "kind": "youtube#video",
        "videoId": "OD9RYVvpKtg"
      },
      "snippet": {
        "publishedAt": "2021-01-15T18:52:23Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "Vino Vino, Asa sunt zilele mele(remix), Esti diamantul vietii mele‼️😎🤣",
        "description": "IratkozzFel #Subscribe #BorosÖcsi IRATKOZZ FEL A CSATORNÁMRA ES NYOMD MEG A CSENGÕT!!! Amennyiben szereted és támogatod a munkásságom, ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/OD9RYVvpKtg/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/OD9RYVvpKtg/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/OD9RYVvpKtg/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-01-15T18:52:23Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "S3AudZnS-JKoyhnmR8iQ0q-9S2Y",
      "id": {
        "kind": "youtube#video",
        "videoId": "CXf5MzEo3zg"
      },
      "snippet": {
        "publishedAt": "2020-11-02T22:40:59Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "Boros Öcsi - 3 órás Bazi Nagy Mulatós Mix💪✅💥",
        "description": "BorosÖcsiPartyEntertainer Az összes eddigi Mulatós Mix amit felvettem, egyben! Tel: 004-0757.31.99.01.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/CXf5MzEo3zg/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/CXf5MzEo3zg/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/CXf5MzEo3zg/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2020-11-02T22:40:59Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "1PK3fYAYMBl2FJZx2qzSdiL8Nmo",
      "id": {
        "kind": "youtube#video",
        "videoId": "a-H5H1FAKys"
      },
      "snippet": {
        "publishedAt": "2021-07-22T11:41:31Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "🥸Boros Öcsi - Lorelei ( Mulatós Remix)💪🤣🔥🤪",
        "description": "",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/a-H5H1FAKys/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/a-H5H1FAKys/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/a-H5H1FAKys/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-07-22T11:41:31Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "AnuedWtleJHjxsuNXzbt8_7sbvk",
      "id": {
        "kind": "youtube#video",
        "videoId": "HH3lZqDb-Ec"
      },
      "snippet": {
        "publishedAt": "2021-07-15T19:37:11Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "JÚLIUS 15 Live Muzsika Boros Öcsivel💪‼️🌴",
        "description": "IratkozzFel #Subscribe #BorosÖcsi IRATKOZZ FEL A CSATORNÁMRA ES NYOMD MEG A CSENGÕT!!! Amennyiben szereted és támogatod a munkásságom, ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/HH3lZqDb-Ec/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/HH3lZqDb-Ec/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/HH3lZqDb-Ec/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-07-15T19:37:11Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "6OMAZuaO3BBFx_5rqhrWvYBVtvY",
      "id": {
        "kind": "youtube#video",
        "videoId": "eYHFvnZYYMU"
      },
      "snippet": {
        "publishedAt": "2021-06-17T20:12:48Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "Június 17 Live Muzsika🔆🔥♨️",
        "description": "IratkozzFel #Subscribe #BorosÖcsi IRATKOZZ FEL A CSATORNÁMRA ES NYOMD MEG A CSENGÕT!!! Amennyiben szereted és támogatod a munkásságom, ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/eYHFvnZYYMU/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/eYHFvnZYYMU/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/eYHFvnZYYMU/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-06-17T20:12:48Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "FF9S8JSPTSQBEf3B6M6CT3gYLcY",
      "id": {
        "kind": "youtube#video",
        "videoId": "pmc6uxnItL8"
      },
      "snippet": {
        "publishedAt": "2021-07-12T17:12:28Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "🌴😎Július 12 Live Muzsika Boros Öcsivel",
        "description": "This stream is created with #PRISMLiveStudio.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/pmc6uxnItL8/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/pmc6uxnItL8/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/pmc6uxnItL8/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-07-12T17:12:28Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "AyNX3tNg8ZxgASrUNs4j1CoxxlY",
      "id": {
        "kind": "youtube#video",
        "videoId": "Er57Xbc7c_M"
      },
      "snippet": {
        "publishedAt": "2021-01-15T19:02:54Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "Boros Öcsi - Szép szemed ha rám ragyog😭🥳😍🤪💪❄️😈😎",
        "description": "IratkozzFel #Subscribe #BorosÖcsi IRATKOZZ FEL A CSATORNÁMRA ES NYOMD MEG A CSENGÕT!!! Amennyiben szereted és támogatod a munkásságom, ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/Er57Xbc7c_M/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/Er57Xbc7c_M/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/Er57Xbc7c_M/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-01-15T19:02:54Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "Kbm2Xygy7rXBWnjtTcasHYhFEE0",
      "id": {
        "kind": "youtube#video",
        "videoId": "cL29r4jVcCI"
      },
      "snippet": {
        "publishedAt": "2021-04-11T19:14:34Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "Live Muzsika Április 11💪",
        "description": "This stream is created with #PRISMLiveStudio.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/cL29r4jVcCI/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/cL29r4jVcCI/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/cL29r4jVcCI/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-04-11T19:14:34Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "3Nq0HchACm9YL9lfgFr_wYb-GYM",
      "id": {
        "kind": "youtube#video",
        "videoId": "BZKXeHfMaow"
      },
      "snippet": {
        "publishedAt": "2020-12-30T13:55:43Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "Elő Szilveszter🥳🥳🥳🥳 Pörgős ✅🤪Live Muzsika",
        "description": "IratkozzFel #Subscribe #BorosÖcsi IRATKOZZ FEL A CSATORNÁMRA ES NYOMD MEG A CSENGÕT Műsor rendelés : Email: oborosocsi@gmail.com ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/BZKXeHfMaow/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/BZKXeHfMaow/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/BZKXeHfMaow/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2020-12-30T13:55:43Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "BWJbL950L7LD6s5GekS_TAhoqqE",
      "id": {
        "kind": "youtube#video",
        "videoId": "fh6UkfTfn2k"
      },
      "snippet": {
        "publishedAt": "2021-01-12T13:48:38Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "Mulatós 🥳 Csárdás ‼️ Lakodalmas Live Muzsika Boros Öcsivel",
        "description": "IratkozzFel #Subscribe #BorosÖcsi IRATKOZZ FEL A CSATORNÁMRA ES NYOMD MEG A CSENGÕT!!! Amennyiben szereted és támogatod a munkásságom, ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/fh6UkfTfn2k/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/fh6UkfTfn2k/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/fh6UkfTfn2k/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-01-12T13:48:38Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "SxW7E7wnMDW0WlvcgyB8gyp1ZYc",
      "id": {
        "kind": "youtube#video",
        "videoId": "-zDKS9RxQn8"
      },
      "snippet": {
        "publishedAt": "2021-03-09T13:09:57Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "🔥Boros Öcsi - 🤣Lapostetű ( Csúnya dal alias Himnusz)",
        "description": "köszönet a szép szövegért mindenkinek aki beküldte.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/-zDKS9RxQn8/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/-zDKS9RxQn8/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/-zDKS9RxQn8/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-03-09T13:09:57Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "YzNhxLXl4YFJsYeu4FU_oTix8VE",
      "id": {
        "kind": "youtube#video",
        "videoId": "OlaDytpunhw"
      },
      "snippet": {
        "publishedAt": "2021-04-01T19:36:45Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "✅Boros Öcsi&#39;s Április 1 Live Muzsika🔥",
        "description": "IratkozzFel #Subscribe #BorosÖcsi IRATKOZZ FEL A CSATORNÁMRA ES NYOMD MEG A CSENGÕT!!! Amennyiben szereted és támogatod a munkásságom, ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/OlaDytpunhw/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/OlaDytpunhw/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/OlaDytpunhw/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-04-01T19:36:45Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "QuvHXiAwYYqiLW64z7poJu2vP8s",
      "id": {
        "kind": "youtube#video",
        "videoId": "M7N-2fqRnYA"
      },
      "snippet": {
        "publishedAt": "2021-06-10T11:47:02Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "Június 10 Live Music with Boros Öcsi 💪✅",
        "description": "This stream is created with #PRISMLiveStudio.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/M7N-2fqRnYA/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/M7N-2fqRnYA/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/M7N-2fqRnYA/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-06-10T11:47:02Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "-0u4cded7Nku3w4Qrm_En2sXRAo",
      "id": {
        "kind": "youtube#video",
        "videoId": "c4REj2Q1yZo"
      },
      "snippet": {
        "publishedAt": "2021-04-02T19:43:25Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "Boros Öcsi&#39;s Aprilis 2 Live Muzsikaaaa",
        "description": "IratkozzFel #Subscribe #BorosÖcsi IRATKOZZ FEL A CSATORNÁMRA ES NYOMD MEG A CSENGÕT!!! Amennyiben szereted és támogatod a munkásságom, ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/c4REj2Q1yZo/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/c4REj2Q1yZo/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/c4REj2Q1yZo/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-04-02T19:43:25Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "fD2e_rW2RninQaPk581uEcoQSl4",
      "id": {
        "kind": "youtube#video",
        "videoId": "pw3uhmo9Dvk"
      },
      "snippet": {
        "publishedAt": "2021-06-28T19:36:32Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "✅Lakodalmas nóták💯‼️🤪🤣🥳",
        "description": "This stream is created with #PRISMLiveStudio.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/pw3uhmo9Dvk/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/pw3uhmo9Dvk/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/pw3uhmo9Dvk/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-06-28T19:36:32Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "p6yNxe0lZRGfptaqGpVThmF5X5I",
      "id": {
        "kind": "youtube#video",
        "videoId": "__spBJKdYWg"
      },
      "snippet": {
        "publishedAt": "2021-07-20T12:18:26Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "✅Live Music! 35 perc💯‼️🤪🤣🥳",
        "description": "This stream is created with #PRISMLiveStudio.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/__spBJKdYWg/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/__spBJKdYWg/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/__spBJKdYWg/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-07-20T12:18:26Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "QNf06X0b7yt0RCzlN3rYDlw3P7Y",
      "id": {
        "kind": "youtube#video",
        "videoId": "gC471fZsuoc"
      },
      "snippet": {
        "publishedAt": "2021-04-22T19:16:28Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "Live Muzsika Április 22🔥",
        "description": "This stream is created with #PRISMLiveStudio.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/gC471fZsuoc/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/gC471fZsuoc/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/gC471fZsuoc/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-04-22T19:16:28Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "o866XvDHJPkg6qX8J5o2luuqywU",
      "id": {
        "kind": "youtube#video",
        "videoId": "f4_SiwODUlE"
      },
      "snippet": {
        "publishedAt": "2021-05-25T19:48:09Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "🤩🍀Május 25 Live Muzsika Boros Öcsivel",
        "description": "IratkozzFel #Subscribe #BorosÖcsi IRATKOZZ FEL A CSATORNÁMRA ES NYOMD MEG A CSENGÕT!!! Amennyiben szereted és támogatod a munkásságom, ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/f4_SiwODUlE/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/f4_SiwODUlE/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/f4_SiwODUlE/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-05-25T19:48:09Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "QGJIF_GS58lKsX-bPfCuJEpiR9E",
      "id": {
        "kind": "youtube#video",
        "videoId": "WUWuAjndSBM"
      },
      "snippet": {
        "publishedAt": "2021-07-08T20:12:55Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "💪🏼Julius 8 Boros Öcsi&#39;s Live Muzsika",
        "description": "IratkozzFel #Subscribe #BorosÖcsi IRATKOZZ FEL A CSATORNÁMRA ES NYOMD MEG A CSENGÕT!!! Amennyiben szereted és támogatod a munkásságom, ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/WUWuAjndSBM/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/WUWuAjndSBM/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/WUWuAjndSBM/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2021-07-08T20:12:55Z"
      }
    },
    {
      "kind": "youtube#searchResult",
      "etag": "m5z74KZ7NQunOD8RTIg8g9AskSQ",
      "id": {
        "kind": "youtube#video",
        "videoId": "A3VSY6veAt8"
      },
      "snippet": {
        "publishedAt": "2020-12-27T15:00:44Z",
        "channelId": "UCXE_9IiemBIeKiEjMN07qiA",
        "title": "✅‼️Boros Öcsi - Én leszek a hajnal fényed🤩 PREMIER‼️ Első magyar feldolgozás",
        "description": "Külön köszönet Ciuca Nórinak a gyönyörű dalszövegért       Eredeti dal: Ghiță Munteanu - Toate dorurile mele #IratkozzFel #Subscribe IRATKOZZ FEL A ...",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/A3VSY6veAt8/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/A3VSY6veAt8/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/A3VSY6veAt8/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Boros Öcsi",
        "liveBroadcastContent": "none",
        "publishTime": "2020-12-27T15:00:44Z"
      }
    }
  ],
  "nextPageToken": "CBkQAA",
  "pageInfo": {
    "totalResults": 83874,
    "resultsPerPage": 25
  }
}