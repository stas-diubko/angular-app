import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthHelper } from '../helpers/auth.helper';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _authHelper: AuthHelper,

    ) { }

    async canActivate(route: ActivatedRouteSnapshot) {
        let token = this._authHelper.getToken();
        if (token.role === "admin") {
            return true;
        }
        this._router.navigate(['home', 'products'], { replaceUrl: true });
        return false;
    }
}
