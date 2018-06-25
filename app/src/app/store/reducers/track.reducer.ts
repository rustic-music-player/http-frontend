import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Track } from '../../contracts/track.model';
import { TrackActionsUnion, TrackActionTypes } from '../actions/track.actions';

export interface State extends EntityState<Track> {}

const adapter = createEntityAdapter<Track>();

export const initialState: State = adapter.getInitialState();

export function reducer(state: State = initialState, action: TrackActionsUnion): State {
    switch (action.type) {
        case TrackActionTypes.FetchSuccess:
            return adapter.addAll(action.payload, state);
        default:
            return state;
    }
}

export const getSelectedTrackId = (state: State) => state.selectedTrackId;

export const {
    selectIds: selectTrackIds,
    selectEntities: selectTrackEntities,
    selectAll: selectAllTracks,
    selectTotal: selectTrackTotal,
} = adapter.getSelectors();