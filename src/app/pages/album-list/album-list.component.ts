import { Component, OnInit } from '@angular/core';
import { Artist } from 'src/app/common/models/Artist';
import { Album } from 'src/app/common/models/Album';
import { SpotifyService } from 'src/app/services/spofity-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {

  id: string;
  artist: Artist;
  albums: Album[];
  unknown: any = '../../assets/img/person.jpg';

  constructor(
      private spotifyService: SpotifyService, private route: ActivatedRoute, private router: Router) {
      }
   ngOnInit() {
      this.route.params
          .map(params => params['id'])
          .subscribe((id) => {
              this.spotifyService.getArtist(id)
                  .subscribe((artist: any) => {
                      this.artist = artist;
                  });
              this.spotifyService.getAlbums(id)
                  .subscribe((albums: any) => {
                      this.albums = albums.items;
                  });
          });
  }

}
