use failure::Error;
use rustic_core::{Rustic, Track, Playlist};
use rustic_core::provider::ProviderItem;
use std::sync::Arc;
use viewmodels::*;
use rayon::prelude::*;

pub fn search(query: &str, rustic: &Arc<Rustic>) -> Result<SearchResults, Error> {
    let providers = &rustic.providers;
    trace!("search {} in {:?}", query, &providers);

    let results: Vec<ProviderItem> = providers
        .iter()
        .flat_map(|provider| provider.read().unwrap().search(query.to_string()))
        .collect();

    let tracks: Vec<TrackModel> = results
        .into_par_iter()
        .filter(|result| result.is_track())
        .map(Track::from)
        .map(|track| TrackModel::new_with_joins(track, rustic))
        .collect();

    Ok(SearchResults {
        tracks,
        albums: vec![],
        artists: vec![],
        playlists: vec![]
    })
}