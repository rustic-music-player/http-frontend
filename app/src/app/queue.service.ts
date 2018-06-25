import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Track } from './contracts/track.model';

@Injectable()
export class QueueService {

    constructor(private http: HttpClient) {
    }

    queue(track: Track): Observable<void> {
        return this.http.post<void>(`/api/queue/${track.id}`, null);
    }

    get(): Observable<Track[]> {
        return this.http.get<Track[]>('/api/queue');
    }
}
