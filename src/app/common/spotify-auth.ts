

export class SpotifyAuthResponse {
    access_token: string;
    expires_in: number;
    state: string;
    token_type: string;
    refresh_token: string;
    scope: string;
    Response: any;
}

export class SpotifyAuthRequest {
    grant_type: 'authorization_code' | string;
    code: string;
    redirect_uri: string;
}
