use rustic_core::library::Track;
use rustic_core::provider::Provider;
use std::sync::Arc;
use rustic_core::Rustic;
use viewmodels::ArtistModel;
use viewmodels::AlbumModel;
use failure::Error;

#[derive(Clone, Debug, Serialize)]
pub struct TrackModel {
    pub id: Option<usize>,
    pub title: String,
    pub artist: Option<ArtistModel>,
    pub album: Option<AlbumModel>,
    pub stream_url: String,
    pub uri: String,
    pub provider: Provider,
    pub coverart: Option<String>,
    pub duration: Option<u64>
}

impl TrackModel {
    pub fn new_with_joins(track: Track, app: &Arc<Rustic>) -> Result<TrackModel, Error> {
        let artist = match track.artist_id {
            Some(id) => app.library.get_artist(&id)?
                .map(|artist| ArtistModel::new(artist, app)),
            None => None
        };
        let album = match track.album_id {
            Some(id) => app.library.get_album(&id)?
                .map(|album| AlbumModel::new(album, app)),
            None => None
        };
        let coverart = track.coverart(app);
        Ok(TrackModel {
            id: track.id,
            title: track.title,
            stream_url: track.stream_url,
            uri: track.uri,
            provider: track.provider,
            coverart,
            duration: track.duration,
            artist,
            album
        })
    }

    pub fn new(track: Track, app: &Arc<Rustic>) -> TrackModel {
        let coverart = track.coverart(app);
        TrackModel {
            id: track.id,
            title: track.title,
            stream_url: track.stream_url,
            uri: track.uri,
            provider: track.provider,
            coverart,
            duration: track.duration,
            artist: None,
            album: None
        }
    }
}