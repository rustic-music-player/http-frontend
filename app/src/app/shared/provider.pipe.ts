import { Pipe, PipeTransform } from '@angular/core';
import { PROVIDERS } from '../providers';

@Pipe({
    name: 'provider'
})
export class ProviderPipe implements PipeTransform {

    transform(name: string): any {
        return PROVIDERS[name];
    }
}
