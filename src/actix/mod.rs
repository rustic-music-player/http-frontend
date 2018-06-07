use ::HttpConfig;
use actix_web::{App, fs, HttpResponse, middleware, Result, server};
use actix_web::http::Method;
use actix_web::HttpRequest;
use rustic_core::logger::logger;
use rustic_core::Rustic;
use std::path::Path;
use std::sync::Arc;

fn build_api_app(app: Arc<Rustic>) -> App<Arc<Rustic>> {
    App::with_state(app)
        .prefix("/api")
        .middleware(middleware::Logger::default())
        .resource("/", |r| r.f(|r| HttpResponse::Ok()))
}

fn index(req: HttpRequest) -> Result<fs::NamedFile> {
    Ok(fs::NamedFile::open(format!("{}/index.html", env!("APP_DIST")))?)
}

fn build_static_app() -> App<()> {
    App::new()
        .middleware(middleware::Logger::default())
        .handler("/", fs::StaticFiles::new(env!("APP_DIST")).default_handler(index))
}

pub fn start(config: HttpConfig, app: Arc<Rustic>) -> Result<()> {
    server::new(move || {
        vec![
            build_api_app(app.clone()).boxed(),
            build_static_app().boxed()
        ]
    })
        .bind(format!("{}:{}", config.ip, config.port))?
        .run();

    info!("[HTTP] Listening on Port {}", config.port);
    Ok(())
}