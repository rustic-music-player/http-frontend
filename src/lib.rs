extern crate rustic_core;
extern crate serde;
extern crate serde_json;
#[macro_use]
extern crate serde_derive;
#[macro_use]
extern crate mime;
#[macro_use]
extern crate log;
extern crate actix_web;
extern crate env_logger;

use rustic_core::Rustic;
use rustic_core::logger::logger;

use std::sync::Arc;

use std::thread;

// mod iron;
mod actix;
mod viewmodels;

#[derive(Deserialize, Clone)]
pub struct HttpConfig {
    pub ip: String,
    pub port: i32
}

pub fn start(config: Option<HttpConfig>, app: Arc<Rustic>) -> thread::JoinHandle<()> {
    ::std::env::set_var("RUST_LOG", "actix_web=info");
    env_logger::init();
    let config = config.unwrap_or(HttpConfig {
        ip: "0.0.0.0".to_owned(),
        port: 8080
    });
    thread::spawn(move|| {
        actix::start(config, app).unwrap();
    })
}