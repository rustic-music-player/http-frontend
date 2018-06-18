import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Album, Artist, Track } from './album.model';
import { LibraryService } from './library.service';

@Component({
    selector: 'rms-library',
    templateUrl: './library.component.html',
    styleUrls: ['./library.component.scss']
})
export class LibraryComponent {
    albums$: Observable<Album[]>;
    artists$: Observable<Artist[]>;
    tracks$: Observable<Track[]>;

    constructor(private library: LibraryService) {
        this.albums$ = this.library.getAlbums();
        this.artists$ = this.library.getArtists();
        this.tracks$ = this.library.getTracks();
    }

    queue(track: Track) {
        console.log(track);
    }
}
