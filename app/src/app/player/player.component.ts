import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ObservableMedia } from '@angular/flex-layout';
import { FlexibleConnectedPositionStrategy, Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { Track } from '../contracts/track.model';
import { RmsState, selectCurrentTrack, selectPlayingState } from '../store/reducers';
import { select, Store } from '@ngrx/store';
import { PlayerNext, PlayerPause, PlayerPlay, PlayerPrev } from '../store/actions/player.actions';

@Component({
    selector: 'rms-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

    private overlayRef: OverlayRef;
    private positionStrategy: FlexibleConnectedPositionStrategy;

    @ViewChild('queueOverlay')
    queueOverlay;

    @ViewChild('queueToggle', { read: ElementRef })
    queueToggle: ElementRef;

    showQueue = false;

    playing = false;
    current$: Observable<Track | null>;

    constructor(private media: ObservableMedia,
                private overlay: Overlay,
                private positionBuilder: OverlayPositionBuilder,
                private store: Store<RmsState>) {
        this.current$ = this.store.pipe(select(selectCurrentTrack));
        this.store
            .pipe(select(selectPlayingState))
            .subscribe(playing => {
                this.playing = playing
            });
    }

    ngOnInit() {
        this.media
            .subscribe(change => {
                if (change.mqAlias === 'xs') {
                    this.closeQueue();
                }
            });
    }

    toggle($event: MouseEvent) {
        $event.preventDefault();
        $event.stopPropagation();
        if (this.playing) {
            this.store.dispatch(new PlayerPause());
        }else {
            this.store.dispatch(new PlayerPlay());
        }
    }

    next($event: MouseEvent) {
        $event.preventDefault();
        $event.stopPropagation();
        this.store.dispatch(new PlayerNext());
    }

    prev($event: MouseEvent) {
        $event.preventDefault();
        $event.stopPropagation();
        this.store.dispatch(new PlayerPrev());
    }

    toggleQueue() {
        if (this.media.isActive('gt-sm')) {
            if (!this.overlayRef) {
                this.setupOverlayRef();
            }
            if (this.showQueue) {
                this.overlayRef.detach();
            }else {
                this.overlayRef.attach(this.queueOverlay);
            }
        }
        this.showQueue = !this.showQueue;
    }

    private closeQueue() {
        if (this.overlayRef &&
            this.overlayRef.hasAttached() &&
            this.showQueue) {
            this.overlayRef.detach();
            this.showQueue = false;
        }
    }

    private setupOverlayRef() {
        this.positionStrategy = this.positionBuilder
            .flexibleConnectedTo(this.queueToggle)
            .withPositions([
                {
                    offsetX: 0,
                    offsetY: -32,
                    originX: 'end',
                    originY: 'top',
                    weight: 1,
                    overlayX: 'end',
                    overlayY: 'bottom'
                }
            ]);
        this.overlayRef = this.overlay.create({
            height: 500,
            width: 400,
            positionStrategy: this.positionStrategy
        });
    }
}
