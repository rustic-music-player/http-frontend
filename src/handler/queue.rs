use failure::Error;
use rustic_core::{Rustic, Track, Playlist};
use std::sync::Arc;
use viewmodels::TrackModel;

pub fn fetch(rustic: &Arc<Rustic>) -> Result<Vec<TrackModel>, Error> {
    let player = &rustic.player;
    let player = player.lock().unwrap();
    player
        .queue
        .tracks
        .iter()
        .cloned()
        .map(|track| TrackModel::new_with_joins(track, &rustic))
        .collect()
}

pub fn queue_track(track_id: usize, rustic: &Arc<Rustic>) -> Result<Option<()>, Error> {
    let library = &rustic.library;
    let player = &rustic.player;
    debug!("adding track to queue {}", &track_id);
    let track: Option<Track> = library.get_track(&track_id)?;
    match track {
        Some(track) => {
            let mut player = player.lock().unwrap();
            player.queue.add_track(track);

            Ok(Some(()))
        },
        None => Ok(None)
    }
}

pub fn queue_playlist(playlist_id: usize, rustic: &Arc<Rustic>) -> Result<Option<()>, Error> {
    let library = &rustic.library;
    let player = &rustic.player;
    debug!("adding playlist to queue {}", &playlist_id);
    let playlist: Option<Playlist> = library.get_playlist(&playlist_id)?;
    match playlist {
        Some(playlist) => {
            let mut player = player.lock().unwrap();
            player.queue.add_multiple(&playlist.tracks);

            Ok(Some(()))
        },
        None => Ok(None)
    }
}

pub fn clear(rustic: &Arc<Rustic>) -> Result<(), Error> {
    debug!("Clearing queue");
    let player = &rustic.player;
    let mut player = player.lock().unwrap();
    player.queue.clear();
    Ok(())
}