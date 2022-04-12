import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spofity-service';
import { AuthService } from 'src/app/services/auth.service';
import { Artist } from 'src/app/common/models/model';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {

  searchStr: string = '';
  searchRes: Artist[];
  unknown: any = '../../assets/imgs/person.svg';

  constructor(private _spotifyService: SpotifyService, private authService: AuthService, private router: Router
    , private route: ActivatedRoute) { }


  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    } else {
      this.route.params
        .map(params => params['artist_name'])
        .subscribe((name) => {
          this.searchStr = name;
          if (this.searchStr == null) {
            this.searchStr = localStorage.getItem('searchartist');
          }
          this.searchMusic();
        });
    }
  }

  searchMusic() {
    this.searchRes = [];
    localStorage.setItem("searchartist", this.searchStr);
    if (this.searchStr != '' && this.searchStr != null) {
      this._spotifyService.searchMusic(this.searchStr)
        .subscribe((res: any) => {
          for (let i = 0; i < res.artists.items.length; i++) {
            if(res.artists.items[i].name.includes(this.searchStr))
              this.searchRes.push(res.artists.items[i]);
          }
        });
    }
  }

}
