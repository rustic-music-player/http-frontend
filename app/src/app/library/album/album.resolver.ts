import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibraryService } from '../library.service';
import { Album } from '../../contracts/album.model';

@Injectable()
export class AlbumResolver implements Resolve<Album> {
    constructor(private library: LibraryService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Album> {
        return this.library.getAlbum(route.params.id);
    }
}