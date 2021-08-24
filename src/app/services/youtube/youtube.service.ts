import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Schema$SearchListResponse } from './models/youtube.models';
import { YoutubeDataAPI } from 'youtube-v3-api'

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

  async download(url: string, title: string, output: 'mp3' | 'mp4') {
    console.log('async download().url: ', url, ', title: ', title, ', output: ', output);
  }
}
