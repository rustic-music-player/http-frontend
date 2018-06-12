use ::HttpConfig;
use actix_web::{App, fs, middleware, Result, server};
use actix_web::http::Method;
use actix_web::HttpRequest;
use rustic_core::Rustic;
use std::sync::Arc;
use handler;

fn build_api_app(app: Arc<Rustic>) -> App<Arc<Rustic>> {
    App::with_state(app)
        .prefix("/api")
        .middleware(middleware::Logger::default())
        .resource("/library/albums", |r| r.method(Method::GET).f(handler::list_albums))
        .resource("/library/albums/{album_id}", |r| r.method(Method::GET).with(handler::get_album))
        .resource("/library/artists", |r| r.method(Method::GET).f(handler::list_artists))
        .resource("/library/playlists", |r| r.method(Method::GET).f(handler::list_playlists))
        .resource("/library/tracks", |r| r.method(Method::GET).f(handler::list_tracks))
        .resource("/queue", |r| r.method(Method::GET).f(handler::get_queue))
        .resource("/queue/{track_id}", |r| r.method(Method::POST).with(handler::add_queue))
        .resource("/player", |r| r.method(Method::GET).f(handler::player_state))
        .resource("/player/play", |r| r.method(Method::POST).f(handler::player_play))
        .resource("/player/pause", |r| r.method(Method::POST).f(handler::player_pause))
        .resource("/player/next", |r| r.method(Method::POST).f(handler::player_next))
        .resource("/player/prev", |r| r.method(Method::POST).f(handler::player_prev))
}

fn index(_req: HttpRequest) -> Result<fs::NamedFile> {
    Ok(fs::NamedFile::open(format!("{}/index.html", env!("APP_DIST")))?)
}

fn build_static_app() -> App<()> {
    App::new()
        .middleware(middleware::Logger::default())
        .handler("/cache", fs::StaticFiles::new(".cache"))
        .handler("/", fs::StaticFiles::new(env!("APP_DIST")).default_handler(index))
}

pub fn start(config: &HttpConfig, app: Arc<Rustic>) -> Result<()> {
    server::new(move || {
        vec![
            build_api_app(app.clone()).boxed(),
            build_static_app().boxed()
        ]
    })
        .bind(format!("{}:{}", config.ip, config.port))?
        .run();

    // info!("[HTTP] Listening on Port {}", config.port);
    Ok(())
}