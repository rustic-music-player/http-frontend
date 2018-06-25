import { Track } from './track.model';

export interface Artist {
    id: number;
    name: string;
    tracks?: Track[];
}