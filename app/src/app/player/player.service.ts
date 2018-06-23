import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { Track } from '../library/album.model';
import { SocketService, Messages } from '../socket.service';

export interface PlayerState {
    playing: boolean,
    current?: Track
}

@Injectable()
export class PlayerService {

    constructor(private http: HttpClient,
                private socket: SocketService) {
    }

    play(): Observable<void> {
        return this.http.post<void>('/api/player/play', null);
    }

    pause(): Observable<void> {
        return this.http.post<void>('/api/player/pause', null);
    }

    next(): Observable<void> {
        return this.http.post<void>('/api/player/next', null);
    }

    prev(): Observable<void> {
        return this.http.post<void>('/api/player/prev', null);
    }

    getState(): Observable<PlayerState> {
        return this.http.get<PlayerState>('/api/player');
    }

    observePlaying(): Observable<boolean> {
        return this.socket
            .ws$
            .pipe(filter(({ type }) => type === Messages.PlayerStateChanged))
            .pipe(map(({ payload }) => payload));
    }

    observeCurrentTrack(): Observable<Track | null> {
        return this.socket
            .ws$
            .pipe(filter(({ type }) => type === Messages.CurrentlyPlayingChanged))
            .pipe(map(({ payload }) => payload));
    }
}
