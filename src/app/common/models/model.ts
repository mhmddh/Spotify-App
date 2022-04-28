export interface Album {
    id: number;
    name: string;
    release_date:string;
    total_tracks:number;
    external_urls: any
}

export interface Artist {
    id: number;
    name: string;
    genres: any;
    albums: Album[];
}
