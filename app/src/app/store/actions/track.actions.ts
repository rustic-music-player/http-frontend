import { Action } from '@ngrx/store';
import { Track } from '../../contracts/track.model';

export enum TrackActionTypes {
    Fetch = '[Library] Fetch Tracks',
    FetchSuccess = '[Library] Fetch Tracks Success',
    FetchError = '[Library] Fetch Tracks Error'
}

export class FetchTracks implements Action {
    readonly type = TrackActionTypes.Fetch;
}

export class FetchTracksSuccess implements Action {
    readonly type = TrackActionTypes.FetchSuccess;

    constructor(public payload: Track[]) {
    }
}

export class FetchTracksError implements Action {
    readonly type = TrackActionTypes.FetchError;

    constructor(public error: any) {
    }
}

export type TrackActionsUnion = FetchTracks |
    FetchTracksSuccess |
    FetchTracksError;