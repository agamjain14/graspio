import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AdminAuthGuard } from '../../guards/admin.auth.guard';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router, private adminGuard: AdminAuthGuard) {

   }
   ngOnInit () {
   }


  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
