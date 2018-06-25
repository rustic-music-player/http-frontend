import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Artist } from '../../contracts/artist.model';
import { ArtistActionsUnion, ArtistActionTypes } from '../actions/artist.actions';

export interface State extends EntityState<Artist> {
    selectedArtistId: number | null;
}

const adapter = createEntityAdapter<Artist>();

export const initialState: State = adapter.getInitialState({
    selectedArtistId: null
});

export function reducer(state: State = initialState, action: ArtistActionsUnion): State {
    switch (action.type) {
        case ArtistActionTypes.FetchSuccess:
            return adapter.addAll(action.payload, state);
        case ArtistActionTypes.Open:
            return {
                ...state,
                selectedArtistId: action.payload
            };
        case ArtistActionTypes.Close:
            return {
                ...state,
                selectedArtistId: null
            };
        default:
            return state;
    }
}

export const getSelectedArtistId = (state: State) => state.selectedArtistId;

export const {
    selectIds: selectArtistIds,
    selectEntities: selectArtistEntities,
    selectAll: selectAllArtists,
    selectTotal: selectArtistTotal,
} = adapter.getSelectors();