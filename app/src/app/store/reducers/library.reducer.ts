import * as albums from './album.reducer';
import * as artists from './artist.reducer';
import * as tracks from './track.reducer';

export interface State {
    albums: albums.State,
    artists: artists.State,
    tracks: tracks.State
}

export const initialState: State = {
    albums: albums.initialState,
    artists: artists.initialState,
    tracks: tracks.initialState
};

export function reducer(state: State = initialState, action): State {
    return {
        albums: albums.reducer(state.albums, action),
        artists: artists.reducer(state.artists, action),
        tracks: tracks.reducer(state.tracks, action)
    };
}