use rustic_core::Rustic;
use rustic_core::player::PlayerState;
use actix_web::{HttpRequest, Json};
use failure::Error;
use viewmodels::{PlayerModel, TrackModel};
use std::sync::Arc;

pub fn player_play(req: HttpRequest<Arc<Rustic>>) -> Result<Json<()>, Error> {
    debug!("player_play playing");
    let rustic = req.state();
    let library = &rustic.library;
    let mut player = (&rustic.player).lock().unwrap();
    player.play();
    Ok(Json(()))
}
