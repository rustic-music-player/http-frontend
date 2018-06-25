import { Action } from '@ngrx/store';
import { Album } from '../../contracts/album.model';

export enum AlbumActionTypes {
    Fetch = '[Library] Fetch Albums',
    FetchSuccess = '[Library] Fetch Albums Success',
    FetchError = '[Library] Fetch Albums Error',
    Open = '[Library] Open Album',
    Close = '[Library] Close Album'
}

export class FetchAlbums implements Action {
    readonly type = AlbumActionTypes.Fetch;
}

export class FetchAlbumsSuccess implements Action {
    readonly type = AlbumActionTypes.FetchSuccess;

    constructor(public payload: Album[]) {
    }
}

export class FetchAlbumsError implements Action {
    readonly type = AlbumActionTypes.FetchError;

    constructor(public error: any) {}
}

export class OpenAlbum implements Action {
    readonly type = AlbumActionTypes.Open;

    constructor(public payload: number) {
    }
}

export class CloseAlbum implements Action {
    readonly type = AlbumActionTypes.Close;
}

export type AlbumActionsUnion = FetchAlbums |
    FetchAlbumsSuccess |
    FetchAlbumsError |
    OpenAlbum |
    CloseAlbum;