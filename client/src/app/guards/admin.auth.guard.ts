import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { decode } from 'jwt-decode';
import 'rxjs/add/operator/first';


@Injectable()
export class AdminAuthGuard implements CanActivate {

    redirectUrl;
    constructor() {
    }
    canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
        const expectedRole = JSON.stringify(router.data.expectedRole);
        const role = localStorage.getItem('role');
        if (role === router.data.expectedRole) {
            this.redirectUrl = state.url;
            return true;
        }
        return false;
    }
}
