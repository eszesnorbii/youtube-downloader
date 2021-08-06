import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Schema$SearchListResponse } from './models/youtube.models';
import { YoutubeDataAPI } from 'youtube-v3-api'

/* import * as fs from 'fs';
import * as ytdl from 'ytdl-core';*/

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  api = new YoutubeDataAPI(environment.firebaseConfig.apiKey);

  constructor() { }

  search(text: string, pageToken?: string): Observable<Schema$SearchListResponse> {
    return from(this.api.searchAll(text, 25, { pageToken })).pipe(
      map((result: any) => {
        return {
          items: result.items?.filter(item => item.id?.kind === 'youtube#video'),
          nextPageToken: result.nextPageToken,
          prevPageToken: result.prevPageToken,
          pageInfo: result.pageInfo
        }
      })
    );
  }

  getChannel(id: string) {
    return this.api.searchChannel(id);
  }

  async download(url: string, title: string, output: 'mp3' | 'mp4') {
    console.log('async download().url: ', url, ', title: ', title, ', output: ', output);

    /*let videoID = await ytdl.getURLVideoID(url);
    console.log('videoId: ', videoID);

    let info = await ytdl.getBasicInfo(url);
    console.log('info: ', info);*/

    // return ytdl(url).pipe(fs.createWriteStream(title + '.' + output));
  }
}
