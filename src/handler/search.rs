use failure::Error;
use rustic_core::{Rustic, Track, Playlist, Album, Artist};
use rustic_core::provider::ProviderItem;
use std::sync::Arc;
use viewmodels::*;
use rayon::prelude::*;

pub fn search(query: &str, rustic: &Arc<Rustic>) -> Result<SearchResults, Error> {
    let providers = &rustic.providers;
    trace!("search {}", query);

    let results = providers
        .iter()
        .map(|provider| provider.read().unwrap().search(query.to_string()))
        .collect::<Result<Vec<_>, Error>>()?;

    let tracks: Vec<TrackModel> = results
        .par_iter()
        .cloned()
        .flat_map(|items| items)
        .filter(|result| result.is_track())
        .map(Track::from)
        .map(|track| TrackModel::new_with_joins(track, rustic))
        .collect();

    let albums: Vec<AlbumModel> = results
        .par_iter()
        .cloned()
        .flat_map(|items| items)
        .filter(|result| result.is_album())
        .map(Album::from)
        .map(|album| AlbumModel::new_with_joins(album, rustic))
        .collect();

    let artists: Vec<ArtistModel> = results
        .par_iter()
        .cloned()
        .flat_map(|items| items)
        .filter(|result| result.is_artist())
        .map(Artist::from)
        .map(|artist| ArtistModel::new_with_joins(artist, rustic))
        .collect();

    Ok(SearchResults {
        tracks,
        albums,
        artists,
        playlists: vec![]
    })
}