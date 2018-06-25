import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { QueueService } from '../../queue.service';
import { Album } from '../../contracts/album.model';
import { Track } from '../../contracts/track.model';
import { RmsState, selectCurrentAlbum } from '../../store/reducers';
import { select, Store } from '@ngrx/store';

@Component({
    selector: 'rms-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.scss']
})
export class AlbumComponent {

    album$: Observable<Album>;

    constructor(private store: Store<RmsState>, private queue: QueueService) {
        this.album$ = this.store.pipe(select(selectCurrentAlbum));
    }

    queueTrack(track: Track) {
        this.queue
            .queue(track)
            .subscribe(() => {
            });
    }

}
