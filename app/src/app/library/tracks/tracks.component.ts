import { Component } from '@angular/core';
import { LibraryService } from '../library.service';
import { Track } from '../album.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'rms-tracks',
    templateUrl: './tracks.component.html',
    styleUrls: ['./tracks.component.scss']
})
export class TracksComponent {
    tracks$: Observable<Track[]>;

    constructor(private library: LibraryService) {
        this.tracks$ = this.library.getTracks();
    }

    queue(track: Track) {
        console.log(track);
    }
}
