import { Component, OnInit } from '@angular/core';
import { RevisionService } from '../../services/revision.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adminrevision',
  templateUrl: './adminrevision.component.html',
  styleUrls: ['./adminrevision.component.css']
})
export class AdminrevisionComponent implements OnInit {


  revisions;
  currentUrl;
  processing = false;
  commentForm: FormGroup;
  newComment = [];
  enabledComments = [];

  constructor(private revisionService: RevisionService,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) {
      this.createCommentForm();
     }

    getAllRevisionOnTaskId(id) {
    this.revisionService.getAllRevisionOnTaskId(id).subscribe(results => {
      this.revisions = results.revisions;
    });
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
      this.getAllRevisionOnTaskId(this.currentUrl.id); // Refresh all revisions to reflect the new comment
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



  ngOnInit() {
    this.currentUrl = this.activatedRoute.snapshot.params;
    this.getAllRevisionOnTaskId(this.currentUrl.id);
  }

}
