import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { AlbumResolver } from './album/album.resolver';
import { LibraryService } from './library.service';
import { LibraryItemsModule } from '../shared/library-items/library-items.module';
import { AlbumsComponent } from './albums/albums.component';
import { ArtistsComponent } from './artists/artists.component';
import { TracksComponent } from './tracks/tracks.component';

const routes: Routes = [
    {
        path: 'library',
        component: LibraryComponent,
        children: [
            {
                path: 'albums',
                component: AlbumsComponent
            },
            {
                path: 'artists',
                component: ArtistsComponent
            },
            {
                path: 'tracks',
                component: TracksComponent
            }
        ]
    },
    {
        path: '',
        redirectTo: '/library/albums',
        pathMatch: 'full'
    },
    {
        path: 'library/albums/:id',
        component: AlbumComponent,
        resolve: {
            album: AlbumResolver
        }
    }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        LibraryItemsModule
    ],
    declarations: [
        LibraryComponent,
        AlbumComponent,
        AlbumsComponent,
        ArtistsComponent,
        TracksComponent
    ],
    exports: [
        LibraryComponent
    ],
    providers: [
        AlbumResolver,
        LibraryService
    ]
})
export class LibraryModule {
}
