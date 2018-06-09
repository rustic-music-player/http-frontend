use rustic_core::library::{SharedLibrary, Playlist, Track};
use rustic_core::provider::{Provider, SharedProviders};

#[derive(Clone, Debug, Serialize)]
pub struct PlaylistModel {
    pub id: Option<usize>,
    pub title: String,
    pub tracks: Vec<Track>,
    pub provider: Provider,
    pub uri: String
}

impl PlaylistModel {
    pub fn from(playlist: Playlist, _library: SharedLibrary, _providers: SharedProviders) -> PlaylistModel {
        PlaylistModel {
            id: playlist.id,
            title: playlist.title,
            tracks: playlist.tracks,
            provider: playlist.provider,
            uri: playlist.uri
        }
    }
}