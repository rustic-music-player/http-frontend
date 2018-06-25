import { Component, Input, HostBinding } from '@angular/core';
import { Album } from '../../../contracts/album.model';

@Component({
  selector: 'rms-album-cover',
  templateUrl: './album-cover.component.html',
  styleUrls: ['./album-cover.component.scss']
})
export class AlbumCoverComponent {

    @Input()
    album: Album;

    @HostBinding('title')
    get title() {
        return this.album.title;
    }
}
