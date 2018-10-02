import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username = '';
  email = '';
  contact;
  address;
  id;
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    // Once component loads, get user's data to display on profile
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Set username
      this.email = profile.user.email; // Set e-mail
      this.contact = profile.user.contact;
      this.address = profile.user.address;
      this.id = profile.user._id;
    });
  }

}
