import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';
import { SharedModule } from '../shared/shared.module';
import { SearchProviderComponent } from './search-provider/search-provider.component';
import { SearchArtistComponent } from './search-artist/search-artist.component';
import { SearchAlbumComponent } from './search-album/search-album.component';

const routes: Routes = [
    {
        path: 'search',
        component: SearchComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        SearchComponent,
        SearchProviderComponent,
        SearchArtistComponent,
        SearchAlbumComponent
    ]
})
export class SearchModule {
}
