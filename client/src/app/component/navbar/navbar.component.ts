import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
<<<<<<< HEAD
=======
import { AdminAuthGuard } from '../../guards/admin.auth.guard';
import 'rxjs/add/observable/empty' ;
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
>>>>>>> task

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
<<<<<<< HEAD

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  // Function to logout user
  onLogoutClick() {
    this.authService.logout(); // Logout user
    this.router.navigate(['/']); // Navigate back to home page
  }

  ngOnInit() {
=======
  constructor(public authService: AuthService, private router: Router, private adminGuard: AdminAuthGuard) {

   }
   ngOnInit () {
   }


  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/']);
>>>>>>> task
  }
}
