import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search.component';
import { SharedModule } from '../shared/shared.module';
import { SearchProviderComponent } from './search-provider/search-provider.component';
import { LibraryItemsModule } from '../shared/library-items/library-items.module';

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
        RouterModule.forChild(routes),
        LibraryItemsModule
    ],
    declarations: [
        SearchComponent,
        SearchProviderComponent
    ]
})
export class SearchModule {
}
