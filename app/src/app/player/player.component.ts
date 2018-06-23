import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlayerService, PlayerState } from './player.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Track } from '../library/album.model';
import { ObservableMedia } from '@angular/flex-layout';
import { FlexibleConnectedPositionStrategy, Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';

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

    constructor(private player: PlayerService,
                private media: ObservableMedia,
                private overlay: Overlay,
                private positionBuilder: OverlayPositionBuilder) {
        this.current$ = this.player.observeCurrentTrack();
        this.player
            .observePlaying()
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
        let observable: Observable<void>;
        if (this.playing) {
            observable = this.player.pause();
        }else {
            observable = this.player.play();
        }
        observable.subscribe(() => {});
    }

    next($event: MouseEvent) {
        $event.preventDefault();
        $event.stopPropagation();
        this.player
            .next()
            .subscribe(() => {
            });
    }

    prev($event: MouseEvent) {
        $event.preventDefault();
        $event.stopPropagation();
        this.player
            .prev()
            .subscribe(() => {
            });
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
