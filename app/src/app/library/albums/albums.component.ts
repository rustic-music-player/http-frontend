import { Component } from '@angular/core';
import { LibraryService } from '../library.service';
import { Observable } from 'rxjs';
import { Album } from '../../contracts/album.model';

@Component({
    selector: 'rms-library-albums',
    templateUrl: './albums.component.html',
    styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent {
    albums$: Observable<Album[]>;

    constructor(private library: LibraryService) {
        this.albums$ = this.library.getAlbums();
    }
}
