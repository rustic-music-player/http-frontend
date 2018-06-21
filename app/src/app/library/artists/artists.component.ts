import { Component } from '@angular/core';
import { LibraryService } from '../library.service';
import { Artist } from '../album.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'rms-artists',
    templateUrl: './artists.component.html',
    styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent {
    artists$: Observable<Artist[]>;

    constructor(private library: LibraryService) {
        this.artists$ = this.library.getArtists();
    }
}
