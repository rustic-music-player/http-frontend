use rustic_core::{Rustic, Track};
use actix_web::{Json, Path, State, error, Result};
use std::sync::Arc;

#[derive(Deserialize)]
pub struct AddQueueQuery {
    track_id: usize
}

pub fn add_queue(req: (State<Arc<Rustic>>, Path<AddQueueQuery>)) -> Result<Json<()>> {
    let (rustic, params) = req;
    let library = &rustic.library;
    let player = &rustic.player;
    debug!("adding to queue {}", &params.track_id);
    let track: Option<Track> = library.get_track(&params.track_id);
    match track {
        Some(track) => {
            let mut player = player.lock().unwrap();
            player.queue.add_track(track);

            Ok(Json(()))
        },
        None => Err(error::ErrorNotFound("Not Found"))
    }
}
