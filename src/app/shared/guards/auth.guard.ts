import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthHelper } from '../helpers/auth.helper';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _authHelper: AuthHelper,

    ) { }

    async canActivate(route: ActivatedRouteSnapshot) {
        let isAuthenticated: boolean = this._authHelper.isAuthenticated()
        if (isAuthenticated) {
            return true;
        }
        this._router.navigate(['auth', 'login'], { replaceUrl: true });
        return false;
    }
}
