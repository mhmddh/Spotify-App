export interface Album {
    id: number;
}

export interface Artist {
    id: number;
    name: string;
    genres: any;
    albums: Album[];
}