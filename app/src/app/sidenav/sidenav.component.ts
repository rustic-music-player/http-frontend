import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'rms-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: [
        './sidenav.component.scss'
    ]
})
export class SidenavComponent {
    constructor(private router: Router) {}

    get inLibrary() {
        return this.router.isActive('library', false);
    }
}
