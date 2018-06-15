import { Component, Input } from '@angular/core';

@Component({
  selector: 'rms-search-artist',
  templateUrl: './search-artist.component.html',
  styleUrls: ['./search-artist.component.scss']
})
export class SearchArtistComponent {

    @Input()
    artist: any;

}
