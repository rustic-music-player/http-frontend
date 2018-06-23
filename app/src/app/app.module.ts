import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { PlayerModule } from './player/player.module';
import { LibraryModule } from './library/library.module';
import { QueueService } from './queue.service';
import { PlaylistsModule } from './playlists/playlists.module';
import { SearchModule } from './search/search.module';
import { MatIconRegistry } from '@angular/material/icon';
import { SocketService } from './socket.service';

@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        PlayerModule,
        LibraryModule,
        PlaylistsModule,
        SearchModule
    ],
    providers: [
        QueueService,
        SocketService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg'));
    }
}
