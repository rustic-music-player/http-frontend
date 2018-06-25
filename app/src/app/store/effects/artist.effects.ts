import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ArtistActionTypes, FetchArtistsError, FetchArtistsSuccess } from '../actions/artist.actions';
import { LibraryService } from '../../library/library.service';
import { of } from 'rxjs';

@Injectable()
export class ArtistEffects {

    @Effect() fetch$ = this.actions$.pipe(
        ofType(ArtistActionTypes.Fetch),
        switchMap(() => this.libraryApi.getArtists().pipe(
            map(artists => new FetchArtistsSuccess(artists)),
            catchError(err => of(new FetchArtistsError(err)))
        ))
    );

    constructor(private actions$: Actions,
                private libraryApi: LibraryService) {
    }
}