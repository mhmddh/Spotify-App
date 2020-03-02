import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-spotify-auth',
  template: '<h3>Authentication;</h3>',
 })
export class SpotifyAuthComponent implements OnInit {


  public constructor(private authService: AuthService, private router: Router){
    this.router.navigate(['artist']);
  }

  public ngOnInit(): void {
  this.router.navigate(['artist']);
  }


}
