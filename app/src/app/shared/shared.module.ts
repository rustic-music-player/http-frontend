import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DurationPipe } from './duration.pipe';
import { ProviderPipe } from './provider.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        // MatChipsModule,
        FlexLayoutModule,
        HttpClientModule,
        DurationPipe,
        ProviderPipe
    ],
    declarations: [
        DurationPipe,
        ProviderPipe
    ]
})
export class SharedModule {
}
