import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AlbumListComponent } from './pages/album-list/album-list.component';
import { ArtistListComponent } from './pages/artist-list/artist-list.component';
import { AppRouteGuard } from './services/app-route-guard';
import { AuthInterceptor } from './services/auth-interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpotifyService } from './services/spofity-service';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SortByPipe } from './common/pipes/sort-by.pipe';
import { RouterModule, Routes } from '@angular/router';
import { SpotifyAuthModule } from './auth-module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'artist', component: ArtistListComponent, canActivate: [ AppRouteGuard]},
  { path: 'artist/:artist_name', component: ArtistListComponent, canActivate: [ AppRouteGuard]},
  {path: 'album/:id', component: AlbumListComponent, canActivate: [ AppRouteGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: LoginComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlbumListComponent,
    ArtistListComponent,
    SortByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(routes),
    SpotifyAuthModule.forRoot(),
    AngularFontAwesomeModule

  ],
  providers: [SpotifyService, AppRouteGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule { }
