import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Album } from '../../contracts/album.model';
import { AlbumActionsUnion, AlbumActionTypes } from '../actions/album.actions';

export interface State extends EntityState<Album> {
    selectedAlbumId: number | null;
}

const adapter = createEntityAdapter<Album>();

export const initialState: State = adapter.getInitialState({
    selectedAlbumId: null
});

export function reducer(state: State = initialState, action: AlbumActionsUnion): State {
    switch (action.type) {
        case AlbumActionTypes.FetchSuccess:
            return adapter.addAll(action.payload, state);
        case AlbumActionTypes.Open:
            return {
                ...state,
                selectedAlbumId: action.payload
            };
        case AlbumActionTypes.Close:
            return {
                ...state,
                selectedAlbumId: null
            };
        default:
            return state;
    }
}

export const getSelectedAlbumId = (state: State) => state.selectedAlbumId;

export const {
    selectIds: selectAlbumIds,
    selectEntities: selectAlbumEntities,
    selectAll: selectAllAlbums,
    selectTotal: selectAlbumTotal,
} = adapter.getSelectors();