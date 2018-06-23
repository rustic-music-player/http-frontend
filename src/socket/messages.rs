use actix::{Recipient, Syn};
use rustic_core::player::PlayerState;
use viewmodels::TrackModel;

#[derive(Message, Clone, Debug, Serialize)]
#[serde(tag = "type", content = "payload", rename_all = "SCREAMING_SNAKE_CASE")]
pub enum Message {
    PlayerStateChanged(bool),
    CurrentlyPlayingChanged(Option<TrackModel>),
    QueueUpdated
}

#[derive(Message)]
#[rtype(String)]
pub struct Connect {
    pub addr: Recipient<Syn, Message>,
}

#[derive(Message, Debug)]
pub struct Disconnect {
    pub id: String,
}
