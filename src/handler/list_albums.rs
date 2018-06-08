use rustic_core::Rustic;
use actix_web::{HttpRequest, Json};
use failure::Error;
use viewmodels::AlbumModel;
use std::sync::Arc;

pub fn list_albums(req: HttpRequest<Arc<Rustic>>) -> Result<Json<Vec<AlbumModel>>, Error> {
    let rustic = req.state();
    let library = &rustic.library;
    let albums: Vec<AlbumModel> = library
        .albums
        .read()
        .unwrap()
        .iter()
        .cloned()
        .map(|album| AlbumModel::from(album, Arc::clone(library)))
        .collect();

    Ok(Json(albums))
}
