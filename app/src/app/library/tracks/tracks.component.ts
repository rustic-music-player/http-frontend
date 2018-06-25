import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Track } from '../../contracts/track.model';
import { select, Store } from '@ngrx/store';
import { RmsState, selectAllTracks } from '../../store/reducers';
import { FetchTracks } from '../../store/actions/track.actions';

@Component({
    selector: 'rms-tracks',
    templateUrl: './tracks.component.html',
    styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {
    tracks$: Observable<Track[]>;

    constructor(private store: Store<RmsState>) {
        this.tracks$ = this.store.pipe(select(selectAllTracks));
    }

    ngOnInit() {
        this.store.dispatch(new FetchTracks());
    }

    queue(track: Track) {
        console.log(track);
    }
}
