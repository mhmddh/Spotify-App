import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { catchError, map } from 'rxjs/operators';
@Injectable()
export class SpotifyService {
    private readonly spotifyUrl = 'https://api.spotify.com/v1/';

    constructor(private http: HttpClient) {
    }

    getArtist(id: string) {
        return this.http.get(this.spotifyUrl + 'artists/' + id);
    }

    searchMusic(str: string, type = 'artist'): Observable<any> {
        return this.http.get(this.spotifyUrl + 'search?q=' + str +
            '&type=' + type + '&market=US&limit=50&offset=0')
    }

    getAlbums(artistId: string) {
        return this.http.get(this.spotifyUrl + 'artists/' + artistId + '/albums');
    }

};
