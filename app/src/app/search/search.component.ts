import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from './search.service';

@Component({
    selector: 'rms-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    get results$() {
        return this.search.results$;
    }

    get pending$() {
        return this.search.pending$;
    }

    constructor(private search: SearchService,
                private activeRoute: ActivatedRoute) {
    }

    ngOnInit() {
        const query = this.activeRoute
            .snapshot
            .queryParamMap
            .get('query');
        if (query) {
            this.search.query(query);
        }
    }
}
