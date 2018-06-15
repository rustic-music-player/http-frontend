import { Component } from '@angular/core';

interface Provider {
    name: string;
    selected: boolean;
}

@Component({
    selector: 'rms-search-provider',
    templateUrl: './search-provider.component.html',
    styleUrls: ['./search-provider.component.scss']
})
export class SearchProviderComponent {
    providers: Provider[] = [
        {
            name: 'soundcloud',
            selected: true
        },
        {
            name: 'spotify',
            selected: true
        },
        {
            name: 'pocketcasts',
            selected: true
        },
        {
            name: 'googleplaymusic',
            selected: true
        },
        {
            name: 'plex',
            selected: true
        },
        {
            name: 'local',
            selected: true
        }
    ];

    toggle(name: string) {
        const index = this.providers
            .findIndex(provider => provider.name === name);
        this.providers[index].selected = !this.providers[index].selected;
    }
}
