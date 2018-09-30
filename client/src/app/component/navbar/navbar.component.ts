import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  role;
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  // Function to logout user
  onLogoutClick() {
    this.authService.logout(); // Logout user
    this.router.navigate(['/']); // Navigate back to home page
  }
  checkRole() {
    if (this.authService.role === 'admin') {
      this.role = true;
    } else {
      this.role = false;
    }console.log('fsdf ' + this.role);
  }
  ngOnInit() {
  }
}
