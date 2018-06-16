import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../search/search.service';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
    selector: 'rms-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.scss'
    ]
})
export class HeaderComponent {

    searchControl = new FormControl();

    @Output('toggle-sidenav')
    toggleSidenav = new EventEmitter<void>();

    constructor(private search: SearchService,
                private router: Router) {
        this.searchControl
            .valueChanges
            .pipe(tap(() => this.router.navigateByUrl('/search')))
            .pipe(debounceTime(500))
            .subscribe(value => this.search.query(value))
    }

    onToggleSidenav() {
        this.toggleSidenav.emit();
    }
}
