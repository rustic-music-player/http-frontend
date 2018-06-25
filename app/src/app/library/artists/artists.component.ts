import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Artist } from '../../contracts/artist.model';
import { RmsState, selectAllArtists } from '../../store/reducers';
import { select, Store } from '@ngrx/store';
import { FetchArtists } from '../../store/actions/artist.actions';

@Component({
    selector: 'rms-artists',
    templateUrl: './artists.component.html',
    styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
    artists$: Observable<Artist[]>;

    constructor(private store: Store<RmsState>) {
        this.artists$ = this.store.pipe(select(selectAllArtists));
    }

    ngOnInit() {
        this.store.dispatch(new FetchArtists());
    }
}
