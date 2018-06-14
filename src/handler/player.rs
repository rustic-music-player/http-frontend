use failure::Error;
use rustic_core::Rustic;
use rustic_core::player::PlayerState;
use std::sync::Arc;
use viewmodels::{PlayerModel, TrackModel};

pub fn get_state(rustic: &Arc<Rustic>) -> Result<PlayerModel, Error> {
    let player = (&rustic.player).lock().unwrap();
    let current = player.queue
        .current()
        .cloned()
        .map(|track| TrackModel::new_with_joins(track, &rustic));

    let state = PlayerModel {
        playing: (player.state == PlayerState::Play),
        current
    };

    Ok(state)
}

pub fn control_next(rustic: &Arc<Rustic>) -> Result<(), Error> {
    let mut player = (&rustic.player).lock().unwrap();
    player.next()?;

    Ok(())
}

pub fn control_prev(rustic: &Arc<Rustic>) -> Result<(), Error> {
    let mut player = (&rustic.player).lock().unwrap();
    player.prev()?;

    Ok(())
}

pub fn control_pause(rustic: &Arc<Rustic>) -> Result<(), Error> {
    let mut player = (&rustic.player).lock().unwrap();
    player.pause()?;

    Ok(())
}

pub fn control_play(rustic: &Arc<Rustic>) -> Result<(), Error> {
    let mut player = (&rustic.player).lock().unwrap();
    player.play()?;

    Ok(())
}