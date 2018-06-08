use rustic_core::Rustic;
use actix_web::{HttpRequest, Json};
use failure::Error;
use viewmodels::TrackModel;
use std::sync::Arc;

pub fn list_tracks(req: HttpRequest<Arc<Rustic>>) -> Result<Json<Vec<TrackModel>>, Error> {
    let rustic = req.state();
    let library = &rustic.library;
    let tracks: Vec<TrackModel> = library
        .tracks
        .read()
        .unwrap()
        .iter()
        .cloned()
        .map(|track| TrackModel::from(track, Arc::clone(library)))
        .collect();

    Ok(Json(tracks))
}
