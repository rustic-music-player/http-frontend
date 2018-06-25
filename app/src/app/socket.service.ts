import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

export const Messages = {
    PlayerStateChanged: 'PLAYER_STATE_CHANGED',
    CurrentlyPlayingChanged: 'CURRENTLY_PLAYING_CHANGED',
    QueueUpdated: 'QUEUE_UPDATED',
};

@Injectable()
export class SocketService {
    private _ws$: WebSocketSubject<any>;

    constructor() {
        this._ws$ = webSocket('ws://localhost:4200/api/socket');
    }

    get ws$() {
        return this._ws$.asObservable();
    }
}