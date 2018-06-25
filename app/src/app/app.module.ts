import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
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
import { reducers } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { PlayerEffects } from './store/effects/player.effects';
import { AlbumEffects } from './store/effects/album.effects';
import { ArtistEffects } from './store/effects/artist.effects';
import { TrackEffects } from './store/effects/track.effects';
import { RouterStateSerializer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomRouterStateSerializer } from './store/reducers/router.reducer';

@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        SharedModule,
        StoreModule.forRoot(reducers),
        StoreDevtoolsModule.instrument(),
        StoreRouterConnectingModule.forRoot({
            stateKey: 'router'
        }),
        EffectsModule.forRoot([
            PlayerEffects,
            AlbumEffects,
            ArtistEffects,
            TrackEffects
        ]),
        PlayerModule,
        LibraryModule,
        PlaylistsModule,
        SearchModule
    ],
    providers: [
        QueueService,
        SocketService,
        {
            provide: RouterStateSerializer,
            useClass: CustomRouterStateSerializer
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
        matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('../assets/mdi.svg'));
    }
}
