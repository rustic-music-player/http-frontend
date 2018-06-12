use rustic_core::library::Artist;
use rustic_core::Rustic;
use std::sync::Arc;
use viewmodels::{AlbumModel, TrackModel};

#[derive(Clone, Debug, Serialize)]
pub struct ArtistModel {
    pub id: Option<usize>,
    pub name: String,
    pub albums: Option<Vec<AlbumModel>>,
    pub tracks: Option<Vec<TrackModel>>,
    pub uri: String
}

impl ArtistModel {
    pub fn new_with_joins(artist: Artist, app: &Arc<Rustic>) -> ArtistModel {
        let albums = app.library.albums.read().unwrap();
        let tracks = app.library.tracks.read().unwrap();
        let albums = albums
            .iter()
            .filter(|albums| albums.artist_id == artist.id)
            .cloned()
            .map(|album| AlbumModel::new(album, app))
            .collect();
        let tracks = tracks
            .iter()
            .filter(|track| track.artist_id == artist.id)
            .cloned()
            .map(|track| TrackModel::new(track, app))
            .collect();
        ArtistModel {
            id: artist.id,
            name: artist.name,
            albums: Some(albums),
            tracks: Some(tracks),
            uri: artist.uri
        }
    }

    pub fn new(artist: Artist) -> ArtistModel {
        ArtistModel {
            id: artist.id,
            name: artist.name,
            albums: None,
            tracks: None,
            uri: artist.uri
        }
    }
}