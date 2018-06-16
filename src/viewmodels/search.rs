use viewmodels::TrackModel;
use viewmodels::PlaylistModel;
use viewmodels::ArtistModel;
use viewmodels::AlbumModel;

#[derive(Serialize)]
pub struct SearchResults {
    pub tracks: Vec<TrackModel>,
    pub albums: Vec<AlbumModel>,
    pub artists: Vec<ArtistModel>,
    pub playlists: Vec<PlaylistModel>
}
