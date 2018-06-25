import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QueueService } from '../../queue.service';
import { Album } from '../../contracts/album.model';
import { Track } from '../../contracts/track.model';

@Component({
    selector: 'rms-album',
    templateUrl: './album.component.html',
    styleUrls: ['./album.component.scss']
})
export class AlbumComponent {

    album$: Observable<Album>;

    constructor(private route: ActivatedRoute, private queue: QueueService) {
        this.album$ = this.route.data.pipe(map(({ album }) => album));
    }

    queueTrack(track: Track) {
        this.queue
            .queue(track)
            .subscribe(() => {
            });
    }

}
