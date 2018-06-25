import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TrackActionTypes, FetchTracksError, FetchTracksSuccess } from '../actions/track.actions';
import { LibraryService } from '../../library/library.service';
import { of } from 'rxjs';

@Injectable()
export class TrackEffects {

    @Effect() fetch$ = this.actions$.pipe(
        ofType(TrackActionTypes.Fetch),
        switchMap(() => this.libraryApi.getTracks().pipe(
            map(tracks => new FetchTracksSuccess(tracks)),
            catchError(err => of(new FetchTracksError(err)))
        ))
    );

    constructor(private actions$: Actions,
                private libraryApi: LibraryService) {
    }
}