import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import {
    AlbumActionTypes,
    CloseAlbum,
    FetchAlbumsError,
    FetchAlbumsSuccess,
    OpenAlbum
} from '../actions/album.actions';
import { LibraryService } from '../../library/library.service';
import { of } from 'rxjs';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { RouterState } from '../reducers/router.reducer';

@Injectable()
export class AlbumEffects {

    @Effect() fetch$ = this.actions$.pipe(
        ofType(AlbumActionTypes.Fetch),
        switchMap(() => this.libraryApi.getAlbums().pipe(
            map(albums => new FetchAlbumsSuccess(albums)),
            catchError(err => of(new FetchAlbumsError(err)))
        ))
    );

    @Effect() open$ = this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter(({ payload }: RouterNavigationAction<RouterState>) => 'albumId' in payload.routerState.params),
        map(({ payload }: RouterNavigationAction<RouterState>) => payload.routerState.params.albumId),
        map(id => new OpenAlbum(id))
    );

    @Effect() close$ = this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        filter(({ payload }: RouterNavigationAction<RouterState>) => !('albumId' in payload.routerState.params)),
        map(() => new CloseAlbum())
    );

    constructor(private actions$: Actions,
                private libraryApi: LibraryService) {
    }
}