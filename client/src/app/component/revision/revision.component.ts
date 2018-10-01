import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';
import { RevisionService } from '../../services/revision.service';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.css']
})
export class RevisionComponent implements OnInit {

  messageClass;
  message;
  newRevision = false;
  loadingRevisions = false;
  processing = false;
  task;
  username = '';
  id = '';
  currentUrl;
  loading = true;
  form;
  revisions;

  commentForm;
  newComment = [];
  enabledComments = [];


  constructor(private taskServe: TaskService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private revisionService: RevisionService,
    private location: Location, private activatedRoute: ActivatedRoute, private router: Router) {
      this.createForm(); // Create Angular 5 Form when component loads
      this.createCommentForm();
    }



  // Function to create registration form
  createForm() {
    this.form = this.formBuilder.group({
      // Description Input
      description: ['', Validators.compose([
        Validators.required, // Field is required
        Validators.minLength(8), // Minimum length is 8 characters
        Validators.maxLength(500), // Maximum length is 500 characters
      ])]
    }); // Add custom validator to form for matching passwords
  }

  // Function to disable the revision form
  disableForm() {
    this.form.controls['description'].disable();
  }

  // Function to enable the revision form
  enableForm() {
    this.form.controls['description'].enable();
  }

  // Function to display new Task form
  newRevisionForm() {
    this.newRevision = true; // Show new task form
  }
  // Reload Tasks on current page
  reloadTasks() {
    this.loadingRevisions = true; // Used to lock button
    // window.location.reload();
    this.getAllRevisionforUseruse(this.id);
    // Get All Tasks
    setTimeout(() => {
      this.loadingRevisions = false; // Release button lock after four seconds
    }, 4000);
  }

  // Function to submit REVISION
  onRevisionSubmit() {
    this.processing = true; // Used to notify HTML that form is in processing, so that it can be disabled
    this.disableForm(); // Disable the form
    // Create revision object form user's inputs
    const revision = {
      description: this.form.get('description').value, //  input field
      taskID: this.currentUrl.id, // TASK ID
      submittedBy : { id : this.id, username: this.username }
    };

    // Function from authentication service to submit revision
    this.revisionService.newRevision(revision).subscribe(data => {
      // Resposne from submitting attempt
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Set an error class
        this.message = data.message; // Set an error message
        this.processing = false; // Re-enable submit button
        this.enableForm(); // Re-enable form
      } else {
        this.messageClass = 'alert alert-success'; // Set a success class
        this.message = data.message; // Set a success message
        // GET ALL REVISION
        this.getAllRevisionforUseruse(this.id);
        // After 2 second timeout, navigate to the login page
        setTimeout(() => {
          this.newRevision = false;
          this.processing = false; // Enable submit button
          this.message = false; // Erase error/success message
          this.form.reset(); // Reset all form fields
          this.enableForm(); // Enable the form fields
        }, 2000);
      }
    });
  }
  // Function to go back to previous page
  goBack() {
    window.location.reload(); // Clear all variable states
    // this.router.navigate(['/task']);
  }


  // Validation for title
  alphaNumericValidation(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/); // Regular expression to perform test
    // Check if test returns false or true
    if (regExp.test(controls.value)) {
      return null; // Return valid
    } else {
      return { 'alphaNumericValidation': true }; // Return error in validation
    }
  }
  // Function to create new blog form
  /*createNewBlogForm() {
    this.form = this.formBuilder.group({
      // Title field
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidation
      ])],
      // Body field
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])]
    });
  }*/

  // Create form for posting comments
  createCommentForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.compose([
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200)
      ])]
    });
  }

  // Enable the comment form
  enableCommentForm() {
    this.commentForm.get('comment').enable(); // Enable comment field
  }

  // Disable the comment form
  disableCommentForm() {
    this.commentForm.get('comment').disable(); // Disable comment field
  }
  // Function to post a new comment on revision post
  draftComment(id) {
    this.commentForm.reset(); // Reset the comment form each time users starts a new comment
    this.newComment = []; // Clear array so only one post can be commented on at a time
    this.newComment.push(id); // Add the post that is being commented on to the array
  }

  // Function to cancel new post transaction
  cancelSubmission(id) {
    const index = this.newComment.indexOf(id); // Check the index of the revision post in the array
    this.newComment.splice(index, 1); // Remove the id from the array to cancel post submission
    this.commentForm.reset(); // Reset  the form after cancellation
    this.enableCommentForm(); // Enable the form after cancellation
    this.processing = false; // Enable any buttons that were locked
  }
  // Function to post a new comment
  postComment(id) {
    this.disableCommentForm(); // Disable form while saving comment to database
    this.processing = true; // Lock buttons while saving comment to database
    const comment = this.commentForm.get('comment').value; // Get the comment value to pass to service function
    // Function to save the comment to the database
    this.revisionService.postComment(id, comment).subscribe(data => {
      this.getAllRevisionforUseruse(this.id); // Refresh all revisions to reflect the new comment
      const index = this.newComment.indexOf(id); // Get the index of the revision id to remove from array
      this.newComment.splice(index, 1); // Remove id from the array
      this.enableCommentForm(); // Re-enable the form
      this.commentForm.reset(); // Reset the comment form
      this.processing = false; // Unlock buttons on comment form
      if (this.enabledComments.indexOf(id) < 0) { this.expand(id); } // Expand comments for user on comment submission
    });
  }

  // Expand the list of comments
  expand(id) {
    this.enabledComments.push(id); // Add the current revision post id to array
  }

  // Collapse the list of comments
  collapse(id) {
    const index = this.enabledComments.indexOf(id); // Get position of id in array
    this.enabledComments.splice(index, 1); // Remove id from array
  }

  getAllRevisionforUseruse(id) {
    this.revisionService.getAllRevisionforUseruse(id).subscribe(results => {
      this.revisions = results.revisions;
    });
  }

  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params; // When component loads, grab the id
    // FETCH USER
    this.authService.getProfile().subscribe(data => {
      this.username = data.user.username;
      this.id = data.user._id;
      this.getAllRevisionforUseruse(this.id);
    });
  }

}
