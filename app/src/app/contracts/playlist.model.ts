import { Track } from './track.model';

export interface Playlist {
    id?: number;
    title: string;
    tracks: Track[];
}