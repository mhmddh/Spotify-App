import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Injectable()
export class SpotifyService {
    private readonly spotifyUrl = 'https://api.spotify.com/v1/';

    constructor(private http: HttpClient) {
    }

    getArtist(id: string) {
        return this.http.get(this.spotifyUrl + 'artists/' + id);
    }

    searchMusic(str: string, type = 'artist') {
        return this.http.get(this.spotifyUrl + 'search?q=' + str +
            '&type=' + type +'&market=US&limit=50&offset=0');
    }


    getAlbums(artistId: string) {
        return this.http.get(this.spotifyUrl + 'artists/' + artistId + '/albums');
        // .map(res => res.json());
    }

    getAlbum(id: string) {
        return this.http.get(this.spotifyUrl + 'albums/' + id);
        // .map(res => res.json());
    }

};
