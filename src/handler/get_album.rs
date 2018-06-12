use rustic_core::Rustic;
use actix_web::{Json, Path, State};
use failure::Error;
use viewmodels::AlbumModel;
use std::sync::Arc;

#[derive(Deserialize)]
pub struct AlbumQuery {
    album_id: usize
}

pub fn get_album(req: (State<Arc<Rustic>>, Path<AlbumQuery>)) -> Result<Json<Option<AlbumModel>>, Error> {
    let (rustic, path) = req;
    let library = &rustic.library;
    let album: Option<AlbumModel> = library
        .get_album(&path.album_id)
        .map(|album| AlbumModel::new_with_joins(album, &rustic));
    Ok(Json(album))
}
