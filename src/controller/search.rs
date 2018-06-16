use actix_web::{State, Query, Json, Result};
use std::sync::Arc;
use rustic_core::Rustic;
use handler::search as search_handler;
use viewmodels::*;

#[derive(Deserialize)]
pub struct SearchQuery {
    query: String
}

pub fn search(req: (State<Arc<Rustic>>, Query<SearchQuery>)) -> Result<Json<SearchResults>> {
    let (rustic, params) = req;
    trace!("search {}", &params.query);
    let result = search_handler::search(&params.query, &rustic)?;
    Ok(Json(result))
}