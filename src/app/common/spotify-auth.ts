export interface AuthConfig {
    client_id: string;
    response_type: 'token' | string;
    redirect_uri: string;
    state: string;
    show_dialog: boolean;
    scope: SpotifyScope[] | string;
}


export interface SpotifyCodeResponse {
    grant_type: 'authorization_code' |  string;
    code: string;
    redirect_uri: string;
}

export class SpotifyAuthResponse {
    access_token: string;
    expires_in: number;
    state: string;
    token_type: string;
    refresh_token: string;
    scope: string;
    Response :any;
}

export class SpotifyAuthRequest {
    grant_type: 'authorization_code' |  string;
    code: string;
    redirect_uri: string;
 //   Authorization: string;

}
export type SpotifyScope =
'user-read-email' |
'user-read-birthdate' |
'user-read-private' |
'user-library-read' |
'playlist-read-private' |
'playlist-modify-private' |
'playlist-modify-public' |
'playlist-read-collaborative' |
'user-top-read' |
'user-read-recently-played' |
'user-library-read' |
'user-library-modify' |
'user-read-currently-playing' |
'user-modify-playback-state' |
'user-read-playback-state' |
'user-follow-read' |
'user-follow-modify' |
'streaming';
