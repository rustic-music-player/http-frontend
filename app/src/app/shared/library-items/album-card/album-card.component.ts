import { Component, Input, HostBinding } from '@angular/core';
import { Album } from '../../../contracts/album.model';

@Component({
    selector: 'rms-album-card',
    templateUrl: './album-card.component.html',
    styleUrls: ['./album-card.component.scss']
})
export class AlbumCardComponent {

    @Input()
    album: Album;

    @HostBinding('title')
    get title() {
        return this.album.title;
    }
}
