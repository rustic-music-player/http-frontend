import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumCardComponent } from './album-card/album-card.component';
import { SharedModule } from '../shared.module';
import { AlbumCoverComponent } from './album-cover/album-cover.component';
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { TrackListItemComponent } from './track-list-item/track-list-item.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [
        AlbumCardComponent,
        AlbumCoverComponent,
        ArtistCardComponent,
        TrackListItemComponent
    ],
    exports: [
        AlbumCardComponent,
        AlbumCoverComponent,
        ArtistCardComponent,
        TrackListItemComponent
    ]
})
export class LibraryItemsModule {
}
