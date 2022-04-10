import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AppRouteGuard } from './services/app-route-guard';
import { AlbumListComponent } from './pages/album-list/album-list.component';
import { ArtistListComponent } from './pages/artist-list/artist-list.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'artist', component: ArtistListComponent, canActivate: [AppRouteGuard] },
  { path: 'artist/:artist_name', component: ArtistListComponent, canActivate: [AppRouteGuard] },
  { path: 'album/:id', component: AlbumListComponent, canActivate: [AppRouteGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
