import { Component } from '@angular/core';


@Component({
    selector: 'rms-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {
    artists = [{
        name: 'Gammer',
        imageUrl: 'assets/gammer.jpg'
    }, {
        name: 'Linkin Park',
        imageUrl: 'assets/linkin-park.jpg'
    }];

    albums = [{
        name: 'Hybrid Theory',
        artist: {
            name: 'Linkin Park'
        },
        imageUrl: 'assets/hybrid-theory.jpg',
        provider: 'spotify'
    }, {
        name: 'Meteora',
        artist: {
            name: 'Linkin Park'
        },
        imageUrl: 'assets/meteora.jpg',
        provider: 'spotify'
    }, {
        name: 'Gammer - Nostalgia EP *Free Download*',
        artist: {
            name: 'Gammer'
        },
        imageUrl: 'assets/nostalgia.jpg',
        provider: 'soundcloud'
    }];
}
