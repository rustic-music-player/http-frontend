import { Track } from './track.model';
import { Artist } from './artist.model';

export interface Album {
    id: number;
    title: string;
    coverart?: string;
    tracks: Track[];
    artist?: Artist;
}