import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface SearchResults {
    tracks: any[],
    albums: any[],
    artists: any[],
    playlists: any[]
}

const EMPTY_RESULTS: SearchResults = {
    tracks: [],
    albums: [],
    artists: [],
    playlists: []
}

@Injectable({
    providedIn: 'root'
})
export class SearchService {

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

    query(query: string) {
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
