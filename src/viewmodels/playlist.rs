use rustic_core::library::Playlist;
use rustic_core::provider::Provider;
use rustic_core::Rustic;
use viewmodels::TrackModel;
use std::sync::Arc;

#[derive(Clone, Debug, Serialize)]
pub struct PlaylistModel {
    pub id: Option<usize>,
    pub title: String,
    pub tracks: Vec<TrackModel>,
    pub provider: Provider,
    pub uri: String
}

impl PlaylistModel {
    pub fn from(playlist: Playlist, app: &Arc<Rustic>) -> PlaylistModel {
        let tracks = playlist.tracks
            .into_iter()
            .map(|track| TrackModel::new_with_joins(track, app))
            .collect();
        PlaylistModel {
            id: playlist.id,
            title: playlist.title,
            tracks,
            provider: playlist.provider,
            uri: playlist.uri
        }
    }
}