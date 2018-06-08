use rustic_core::Rustic;
use actix_web::{HttpRequest, Json};
use failure::Error;
use std::sync::Arc;

pub fn player_play(req: HttpRequest<Arc<Rustic>>) -> Result<Json<()>, Error> {
    debug!("player_play playing");
    let rustic = req.state();
    let mut player = (&rustic.player).lock().unwrap();
    player.play();
    Ok(Json(()))
}
