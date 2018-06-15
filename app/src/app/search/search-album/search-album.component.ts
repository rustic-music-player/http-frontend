import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'rms-search-album',
    templateUrl: './search-album.component.html',
    styleUrls: ['./search-album.component.scss']
})
export class SearchAlbumComponent {

    @Input()
    album: any;

    @HostBinding('title')
    get title() {
        return this.album.name;
    }
}
