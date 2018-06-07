use iron::prelude::*;
use iron::error::HttpResult;
use iron::{Listening, Handler};
use iron::middleware::{Chain, AroundMiddleware};
use iron::status;
use std::fs::File;

use mount::Mount;
use staticfile::Static;
use std::path::Path;

mod api;

struct Fallback;

impl AroundMiddleware for Fallback {
    fn around(self, handler: Box<Handler>) -> Box<Handler> {
        Box::new(FallbackHandler(handler))
    }
}

struct FallbackHandler(Box<Handler>);

impl Handler for FallbackHandler {
    fn handle(&self, req: &mut Request) -> IronResult<Response> {
        let resp = self.0.handle(req);

        match resp {
            Err(err) => {
                match err.response.status {
                    Some(status::NotFound) => {
                        let file = File::open(format!("{}/index.html", env!("APP_DIST"))).unwrap();
                        Ok(Response::with((mime!(Text/Html), status::Ok, file)))
                    }
                    _ => Err(err),
                }
            }
            other => other
        }
    }
}

fn build_mount(app: Arc<Rustic>) -> Mount {
    let mut mount = Mount::new();
    // Rest API
    mount.mount("/api", api::build(Arc::clone(&app.player), Arc::clone(&app.library), app.providers.clone()));
    // Frontend
    let mut frontend = Chain::new(Static::new(Path::new(env!("APP_DIST"))));
    frontend.link_around(Fallback);
    mount.mount("/", frontend);

    mount
}

pub fn start(config: HttpConfig, app: Arc<Rustic>) {
    let mount = build_mount(app);
    let server = Iron::new(mount);
    let guard = server.http(format!("{}:{}", config.ip, config.port));
    info!(logger, "[HTTP] Listening on Port {}", config.port);
}
