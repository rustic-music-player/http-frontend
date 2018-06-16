import { Component } from '@angular/core';
import { SearchService } from './search.service';

@Component({
    selector: 'rms-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent {

    constructor(private search: SearchService) {}

    get results$() {
        return this.search.results$;
    }

    get pending$() {
        return this.search.pending$;
    }
}
