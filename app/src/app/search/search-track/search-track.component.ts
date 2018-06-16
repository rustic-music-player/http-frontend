import { Component, Input } from '@angular/core';

@Component({
  selector: 'rms-search-track',
  templateUrl: './search-track.component.html',
  styleUrls: ['./search-track.component.scss']
})
export class SearchTrackComponent {

    @Input()
    track;

}
