use iron::prelude::*;
use iron::status;
use iron::Handler;

use rustic_core::library::SharedLibrary;
use api::viewmodels::TrackModel;

use serde_json;

pub struct ListTracksHandler {
    library: SharedLibrary
}

impl ListTracksHandler {
    pub fn new(library: SharedLibrary) -> ListTracksHandler {
        ListTracksHandler {
            library
        }
    }
}

impl Handler for ListTracksHandler {
    fn handle(&self, _: &mut Request) -> IronResult<Response> {
        let tracks: Vec<TrackModel> = self.library
            .tracks
            .read()
            .unwrap()
            .iter()
            .cloned()
            .map(|track| TrackModel::from(track, self.library.clone()))
            .collect();
        let res = serde_json::to_string(&tracks).unwrap();

        Ok(Response::with((mime!(Application/Json), status::Ok, res)))
    }
}