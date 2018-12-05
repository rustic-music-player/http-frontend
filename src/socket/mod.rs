use actix::{Addr, Syn, Arbiter};
use actix_web::{App, HttpRequest, HttpResponse, middleware, ws, Error, http::Method};
use rustic_core::{Rustic, player::{PlayerEvent, PlayerState}};
use std::sync::Arc;
use std::thread;
use viewmodels::TrackModel;

mod messages;
mod server;
mod session;

pub struct SocketState {
    pub rustic: Arc<Rustic>,
    pub addr: Addr<Syn, server::SocketServer>,
}

pub fn build_socket_app(rustic: Arc<Rustic>) -> App<SocketState> {
    let addr = Arbiter::start(|_| server::SocketServer::default());
    let state = SocketState {
        rustic: rustic.clone(),
        addr: addr.clone(),
    };
    thread::spawn(move|| {
        let player = Arc::clone(&rustic.player);

        loop {
            let event = player.observe().recv();

            match event {
                Some(PlayerEvent::StateChanged(state)) => {
                    debug!("received new playing state");
                    addr.do_send(messages::Message::PlayerStateChanged(state == PlayerState::Play));
                },
                Some(PlayerEvent::TrackChanged(track)) => {
                    debug!("received currently playing track");
                    let model = TrackModel::new_with_joins(track, &rustic).ok();
                    addr.do_send(messages::Message::CurrentlyPlayingChanged(model));
                },
                msg => debug!("unexpected msg {:?}", msg)
            }
        }
    });
    App::with_state(state)
        .middleware(middleware::Logger::default())
        .prefix("/api/socket")
        .resource("/", |r| r.method(Method::GET).f(open))
}

pub fn open(req: HttpRequest<SocketState>) -> Result<HttpResponse, Error> {
    debug!("connection");
    ws::start(req, session::SocketSession::default())
}