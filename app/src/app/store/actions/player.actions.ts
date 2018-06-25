import { Action } from '@ngrx/store';
import { Track } from '../../contracts/track.model';

export enum PlayerActionTypes {
    Play = '[Player] Play',
    Pause = '[Player] Pause',
    Stop = '[Player] Stop',
    Prev = '[Player] Prev',
    Next = '[Player] Next',
    CurrentTrackUpdated = '[Player] Current Track Updated',
    StateUpdated = '[Player] State Updated'
}

export class PlayerPlay implements Action {
    readonly type = PlayerActionTypes.Play;
}

export class PlayerPause implements Action {
    readonly type = PlayerActionTypes.Pause;
}

export class PlayerStop implements Action {
    readonly type = PlayerActionTypes.Stop;
}

export class PlayerPrev implements Action {
    readonly type = PlayerActionTypes.Prev;
}

export class PlayerNext implements Action {
    readonly type = PlayerActionTypes.Next;
}

export class PlayerCurrentTrackUpdated implements Action {
    readonly type = PlayerActionTypes.CurrentTrackUpdated;

    constructor(public payload: Track | null) {}
}

export class PlayerStateUpdated implements Action {
    readonly type = PlayerActionTypes.StateUpdated;

    constructor(public payload: boolean) {}
}

export type PlayerActionsUnion = PlayerPlay |
    PlayerPause |
    PlayerStop |
    PlayerPrev |
    PlayerNext |
    PlayerCurrentTrackUpdated |
    PlayerStateUpdated;