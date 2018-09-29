import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';


@Injectable()
export class AdminAuthGuard implements CanActivate {

    redirectUrl;
    constructor(private authService: AuthService, private router: Router) {
    }
    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        return this.authService.getProfile().map(profile => {
            if (profile.user.isAdmin === true) {
                this.redirectUrl = state.url;
                return true;
            } else {
                return false;
            }
        }).first();
    }
}
