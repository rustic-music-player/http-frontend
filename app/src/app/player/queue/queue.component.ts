import { Component, OnInit } from '@angular/core';
import { QueueService } from '../../queue.service';
import { Track } from '../../library/album.model';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'rms-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

    queue$: Observable<Track[]>;

    constructor(private api: QueueService) {
    }

    ngOnInit() {
        this.queue$ = timer(0, 1000)
            .pipe(switchMap(() => this.api.get()));
    }

}
