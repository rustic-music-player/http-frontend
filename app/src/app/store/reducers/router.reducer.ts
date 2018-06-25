import { routerReducer, RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { Params, RouterStateSnapshot } from '@angular/router';

export interface RouterState {
    url: string;
    params: Params;
    queryParams: Params;
}

export type State = RouterReducerState<RouterState>;

export const reducer = routerReducer;

export class CustomRouterStateSerializer implements RouterStateSerializer<RouterState> {
    serialize(routerState: RouterStateSnapshot): RouterState {
        let route = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const {
            url,
            root: { queryParams },
        } = routerState;
        const { params } = route;

        return {
            url,
            params,
            queryParams
        };
    }
}