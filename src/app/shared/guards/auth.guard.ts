import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from '../services/login.sevice';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        public authService: LoginService,
        public router: Router
    ) { }

    async canActivate(route: ActivatedRouteSnapshot) {
        let isAuthenticated: boolean = this.authService.isAuthenticated()
        if (isAuthenticated) {
            return true;
        }
        this.router.navigate(['auth', 'login'], { replaceUrl: true });
        return false;
    }
}
