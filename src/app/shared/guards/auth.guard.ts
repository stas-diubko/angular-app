import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LoginService } from '../services/login.sevice';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public auth: LoginService, public router: Router) { }

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigateByUrl("/auth/login");
            return false;
        }
        return true;
    }
}
