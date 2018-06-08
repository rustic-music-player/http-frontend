use rustic_core::Rustic;
use rustic_core::player::PlayerState;
use actix_web::{HttpRequest, Json};
use failure::Error;
use viewmodels::{PlayerModel, TrackModel};
use std::sync::Arc;

pub fn player_state(req: HttpRequest<Arc<Rustic>>) -> Result<Json<PlayerModel>, Error> {
    let rustic = req.state();
    let library = &rustic.library;
    let player = (&rustic.player).lock().unwrap();
    let current = player.queue
        .current()
        .cloned()
        .map(|track| TrackModel::from(track, Arc::clone(library)));

    let state = PlayerModel {
        playing: (player.state == PlayerState::Play),
        current
    };
    Ok(Json(state))
}
