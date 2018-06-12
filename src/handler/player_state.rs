use rustic_core::Rustic;
use rustic_core::player::PlayerState;
use actix_web::{HttpRequest, Json};
use failure::Error;
use viewmodels::{PlayerModel, TrackModel};
use std::sync::Arc;

pub fn player_state(req: HttpRequest<Arc<Rustic>>) -> Result<Json<PlayerModel>, Error> {
    let rustic = req.state();
    let player = (&rustic.player).lock().unwrap();
    let current = player.queue
        .current()
        .cloned()
        .map(|track| TrackModel::new_with_joins(track, &rustic));

    let state = PlayerModel {
        playing: (player.state == PlayerState::Play),
        current
    };
    Ok(Json(state))
}
