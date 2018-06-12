use rustic_core::Rustic;
use actix_web::{HttpRequest, Json};
use failure::Error;
use std::sync::Arc;

pub fn player_prev(req: HttpRequest<Arc<Rustic>>) -> Result<Json<()>, Error> {
    let rustic = req.state();
    let mut player = (&rustic.player).lock().unwrap();
    player.prev()?;
    Ok(Json(()))
}
