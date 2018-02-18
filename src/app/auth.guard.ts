import { 
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Route,
    CanLoad
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as fromRoot from './app.reducer';
import { take } from 'rxjs/operators'

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor( 
        private store: Store<fromRoot.State>
    ){}

    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ){
        return this.store.select(fromRoot.getIsAuth).pipe(take(1))
    }
    canLoad( route: Route ){
        return this.store.select(fromRoot.getIsAuth).pipe(take(1))
    }

}