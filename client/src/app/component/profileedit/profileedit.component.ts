import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profileedit',
  templateUrl: './profileedit.component.html',
  styleUrls: ['./profileedit.component.css']
})
export class ProfileeditComponent implements OnInit {


  message;
  messageClass;
  user;
  processing = false;
  currentUrl;
  loading = true;
  constructor(private activatedRoute: ActivatedRoute,
    private location: Location,
    public authService: AuthService,
    private router: Router) { }

  // Function to Submit Update
  updateUserSubmit() {
    this.processing = true; // Lock form fields
    // Function to send blog object to backend
    this.authService.editUser(this.user).subscribe(data => {
      // Check if PUT request was a success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set error bootstrap class
        this.message = data.message; // Set error message
        this.processing = false; // Unlock form fields
      } else {
        this.messageClass = 'alert alert-success'; // Set success bootstrap class
        this.message = data.message; // Set success message
        // After two seconds, navigate back to blog page
        setTimeout(() => {
          this.router.navigate(['/profile']); // Navigate back to route page
        }, 2000);
      }
    });
  }

  // Function to go back to previous page
  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    // Function to GET current blog with id in params
    this.authService.getSingleUser(this.currentUrl.id).subscribe(data => {
      // Check if GET request was success or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set bootstrap error class
        this.message = 'User not found.'; // Set error message
      } else {
        this.user = data.user; // Save blog object for use in HTML
        this.loading = false; // Allow loading of blog form
      }
    });

  }
}
