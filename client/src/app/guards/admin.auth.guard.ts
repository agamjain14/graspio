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

        /*return this.authService.user.switchMap(user => this.authService.checkAdmin())
        .map(user => user.user.isAdmin);*/


       /* this.authService.getProfile().subscribe(user => {
            if (user.user.isAdmin === true) {
                return true;
            } else {
                return false;
            }
        });*/

       /* if (this.authService.getProfile().user.isAdmin !== true) {
            this.router.navigate(['login']);
            return false;
          } else {
            return true;
          }*/

        /*const admin = router.data.isAdmin || false;
        const user = this.authService.getProfile();

        if (user.isAdmin !== admin) {

        }*/



        /*return new Observable(() => {
            this.authService.getProfile().subscribe(profile => {
                 if (profile.user.isAdmin) {
                     console.log('test1');
                     return true;
                 } else {
                     console.log('test2');
                     this.redirectUrl = state.url;
                     this.router.navigate(['/login']);
                     return false;
                 }
             });
         });*/
        /*this.authService.getProfile().subscribe(profile => {
            console.log(profile.user.isAdmin);
            if (profile.user.isAdmin) {
                console.log('test1');
                this.flag = true;
            }
        });
        console.log('test2');
        return false;*/
        /*setTimeout(() => {
            if (this.flag) {
                return true;
            } else {
                this.redirectUrl = state.url;
                this.router.navigate(['/login']);
                console.log('test2');
                return false;
            }
          }, 2000);*/


        // return this.authService.getProfile().map(user => {console.log(user); return user.isAdmin; }  ).first();

    }
}
