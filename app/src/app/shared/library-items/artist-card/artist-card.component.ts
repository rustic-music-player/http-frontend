import { Component, Input } from '@angular/core';
import { Artist } from '../../../contracts/artist.model';

@Component({
  selector: 'rms-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss']
})
export class ArtistCardComponent {

    @Input()
    artist: Artist;
}
