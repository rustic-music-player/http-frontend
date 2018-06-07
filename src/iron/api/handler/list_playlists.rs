use iron::prelude::*;
use iron::status;
use iron::Handler;

use rustic_core::library::SharedLibrary;
use rustic_core::provider::SharedProviders;
use viewmodels::PlaylistModel;

use serde_json;
use std::sync::Arc;

pub struct ListPlaylistsHandler {
    library: SharedLibrary,
    providers: SharedProviders
}

impl ListPlaylistsHandler {
    pub fn new(library: SharedLibrary, providers: SharedProviders) -> ListPlaylistsHandler {
        ListPlaylistsHandler {
            library,
            providers
        }
    }
}

impl Handler for ListPlaylistsHandler {
    fn handle(&self, _: &mut Request) -> IronResult<Response> {
        let playlists: Vec<PlaylistModel> = self.library
            .playlists
            .read()
            .unwrap()
            .iter()
            .cloned()
            .map(|playlist| PlaylistModel::from(playlist, Arc::clone(&self.library), self.providers.clone()))
            .collect();
        let res = serde_json::to_string(&playlists).unwrap();

        Ok(Response::with((mime!(Application/Json), status::Ok, res)))
    }
}