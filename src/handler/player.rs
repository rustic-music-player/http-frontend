use failure::Error;
use rustic_core::player::PlayerState;
use rustic_core::Rustic;
use std::sync::Arc;
use viewmodels::{PlayerModel, TrackModel};

pub fn get_state(rustic: &Arc<Rustic>) -> Result<PlayerModel, Error> {
    let current = match rustic.player.current() {
        Some(track) => Some(TrackModel::new_with_joins(track, &rustic)?),
        None => None,
    };

    let state = PlayerModel {
        playing: (rustic.player.state() == PlayerState::Play),
        current,
    };

    Ok(state)
}

pub fn control_next(rustic: &Arc<Rustic>) -> Result<(), Error> {
    let player = Arc::clone(&rustic.player);
    player.next()?;

    Ok(())
}

pub fn control_prev(rustic: &Arc<Rustic>) -> Result<(), Error> {
    let player = Arc::clone(&rustic.player);
    player.prev()?;

    Ok(())
}

pub fn control_pause(rustic: &Arc<Rustic>) -> Result<(), Error> {
    let player = Arc::clone(&rustic.player);
    player.set_state(PlayerState::Pause)?;

    Ok(())
}

pub fn control_play(rustic: &Arc<Rustic>) -> Result<(), Error> {
    let player = Arc::clone(&rustic.player);
    player.set_state(PlayerState::Play)?;

    Ok(())
}
