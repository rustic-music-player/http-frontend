use rustic_core::Rustic;
use actix_web::{HttpRequest, Json};
use failure::Error;
use viewmodels::PlaylistModel;
use std::sync::Arc;

pub fn list_playlists(req: HttpRequest<Arc<Rustic>>) -> Result<Json<Vec<PlaylistModel>>, Error> {
    let rustic = req.state();
    let library = &rustic.library;
    let providers = &rustic.providers;
    let playlists: Vec<PlaylistModel> = library
        .playlists
        .read()
        .unwrap()
        .iter()
        .cloned()
        .map(|playlist| PlaylistModel::from(playlist, Arc::clone(library), providers.clone()))
        .collect();

    Ok(Json(playlists))
}
