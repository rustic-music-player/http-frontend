import { Component, Input, HostBinding } from '@angular/core';
import { Album } from '../../library/album.model';

@Component({
    selector: 'rms-search-album',
    templateUrl: './search-album.component.html',
    styleUrls: ['./search-album.component.scss']
})
export class SearchAlbumComponent {

    @Input()
    album: Album;

    @HostBinding('title')
    get title() {
        return this.album.title;
    }
}
