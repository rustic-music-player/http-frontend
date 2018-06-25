import { Album } from './album.model';
import { Artist } from './artist.model';

export interface Track {
    id: number;
    title: string;
    uri: string;
    album?: Album;
    artist?: Artist;
    stream_url: string;
    coverart: string;
}