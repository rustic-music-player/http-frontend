import { ActionReducerMap, createSelector } from '@ngrx/store';
import * as player from './player.reducer';

export interface RmsState {
    player: player.State
}

export const reducers: ActionReducerMap<RmsState> = {
    player: player.reducer
};

export function selectPlayerState(state: RmsState): player.State {
    return state.player;
}

export const selectCurrentTrack = createSelector(
    selectPlayerState,
    player.selectCurrentTrack
);

export const selectPlayingState = createSelector(
    selectPlayerState,
    player.selectPlayingState
);
