export interface Album {
    id: number;
    title: string;
    coverart?: string;
    tracks: Track[];
}

export interface Track {
    id: number;
    title: string;
    uri: string;
    album?: Album;
    artist?: Artist;
    stream_url: string;
    coverart: string;
}

export interface Artist {
    id: number;
    name: string;
    tracks?: Track[];
}