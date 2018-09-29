import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/take';

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
