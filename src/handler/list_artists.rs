use rustic_core::Rustic;
use actix_web::{HttpRequest, Json};
use failure::Error;
use std::sync::Arc;
use viewmodels::ArtistModel;

pub fn list_artists(req: HttpRequest<Arc<Rustic>>) -> Result<Json<Vec<ArtistModel>>, Error> {
    let rustic = req.state();
    let library = &rustic.library;
    let artists: Vec<ArtistModel> = library
        .artists
        .read()
        .unwrap()
        .iter()
        .cloned()
        .map(|artist| ArtistModel::new_with_joins(artist, &rustic))
        .collect();

    Ok(Json(artists))
}
