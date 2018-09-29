import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { AdminAuthGuard } from '../../guards/admin.auth.guard';
import { Subscription } from 'rxjs/Subscription';
import { first, map } from 'rxjs/operators';
import 'rxjs/add/observable/empty' ;
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {




  constructor(public authService: AuthService, private router: Router, private adminGuard: AdminAuthGuard) {

   }
   ngOnInit () {

    /*if (this.username !== null && this.username !== undefined) {
      return this.authService.getProfile().subscribe(user => this.user$ = user);
    } else {
      return Observable.empty();
    }*/
    // this.dataSubscription = this.authService.getProfile().subscribe(user => this.user$ = user);
    // this.dataSubscription = this.authService.getProfile().subscribe(data => this.user$ = data.user);
    // console.log('hgh' + this.dataSubscription.remove);



    /*return this.authService.getProfile1().subscribe((user) => {
      console.log('user' + user.user.username);
      this.user = {
        username: user.user.username,
        email: user.user.email
      };
    }, (err) => {
      this.user = {
        username: err,
        email: err
      };
    });*/

    /*this.authService.getProfile()
    .map((data) => {
      const result: Array<User> = [];
      if (data) {
        data.forEach((user) => {
          result.push(new User(user.email, user.username));
        });
      }
    })
    .subscribe(res => this.user$ = res);*/
   }


  onLogoutClick() {
    // console.log('this.user' + this.user$.email);
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
