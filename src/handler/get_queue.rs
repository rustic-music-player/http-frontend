use rustic_core::Rustic;
use actix_web::{HttpRequest, Json};
use failure::Error;
use viewmodels::TrackModel;
use std::sync::Arc;

pub fn get_queue(req: HttpRequest<Arc<Rustic>>) -> Result<Json<Vec<TrackModel>>, Error> {
    let rustic = req.state();
    let player = &rustic.player;
    let player = player.lock().unwrap();
    let tracks: Vec<TrackModel> = player
        .queue
        .tracks
        .iter()
        .cloned()
        .map(|track| TrackModel::new_with_joins(track, &rustic))
        .collect();

    Ok(Json(tracks))
}
