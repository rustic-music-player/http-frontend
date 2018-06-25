import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Track } from '../contracts/track.model';
import { Album } from '../contracts/album.model';
import { Artist } from '../contracts/artist.model';
import { Playlist } from '../contracts/playlist.model';

export interface SearchResults {
    tracks: Track[],
    albums: Album[],
    artists: Artist[],
    playlists: Playlist[]
}

const EMPTY_RESULTS: SearchResults = {
    tracks: [],
    albums: [],
    artists: [],
    playlists: []
};

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    private _query$ = new BehaviorSubject<string>('');
    private _pending$ = new BehaviorSubject<boolean>(false);
    private _results$ = new BehaviorSubject<SearchResults>(EMPTY_RESULTS);
    private _providers$ = new BehaviorSubject([]);

    constructor(private http: HttpClient) {
    }

    get results$(): Observable<SearchResults> {
        return this._results$.asObservable();
    }

    get pending$(): Observable<boolean> {
        return this._pending$.asObservable();
    }

    get query$(): Observable<string> {
        return this._query$.asObservable();
    }

    query(query: string) {
        this._query$.next(query);
        this._pending$.next(true);
        this._results$.next(EMPTY_RESULTS);
        this.http
            .get<any>('/api/search', {
                params: {
                    query
                }
            })
            .subscribe(results => {
                this._results$.next(results);
                this._pending$.next(false);
            });
    }
}
