use failure::Error;
use rustic_core::Rustic;
use std::sync::Arc;
use viewmodels::*;

pub fn fetch_album(album_id: usize, rustic: &Arc<Rustic>) -> Result<Option<AlbumModel>, Error> {
    let library = &rustic.library;
    let album: Option<AlbumModel> = library
        .get_album(&album_id)
        .map(|album| AlbumModel::new_with_joins(album, &rustic));

    Ok(album)
}

pub fn fetch_albums(rustic: &Arc<Rustic>) -> Result<Vec<AlbumModel>, Error> {
    let library = &rustic.library;
    let albums: Vec<AlbumModel> = library
        .albums
        .read()
        .unwrap()
        .iter()
        .cloned()
        .map(|album| AlbumModel::new_with_joins(album, &rustic))
        .collect();

    Ok(albums)
}

pub fn fetch_artists(rustic: &Arc<Rustic>) -> Result<Vec<ArtistModel>, Error> {
    let library = &rustic.library;
    let artists: Vec<ArtistModel> = library
        .artists
        .read()
        .unwrap()
        .iter()
        .cloned()
        .map(|artist| ArtistModel::new_with_joins(artist, &rustic))
        .collect();

    Ok(artists)
}

pub fn fetch_playlists(rustic: &Arc<Rustic>) -> Result<Vec<PlaylistModel>, Error> {
    let library = &rustic.library;
    let playlists: Vec<PlaylistModel> = library
        .playlists
        .read()
        .unwrap()
        .iter()
        .cloned()
        .map(|playlist| PlaylistModel::from(playlist, &rustic))
        .collect();

    Ok(playlists)
}

pub fn fetch_tracks(rustic: &Arc<Rustic>) -> Result<Vec<TrackModel>, Error> {
    let library = &rustic.library;
    let tracks: Vec<TrackModel> = library
        .tracks
        .read()
        .unwrap()
        .iter()
        .cloned()
        .map(|track| TrackModel::new_with_joins(track, &rustic))
        .collect();

    Ok(tracks)
}