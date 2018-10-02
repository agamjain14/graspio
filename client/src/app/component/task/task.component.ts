import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  messageClass;
  message;
  newTask = false;
  loadingTasks = false;
  processing = false;
  assignmentProccessing = false;
  username;
  taskPosts;
  users;
  role;
  temp;

  form;
  displayedColumns = ['_id', 'title', 'body', 'createdBy', 'createdOn', 'assignedTo', 'view'];
  // taskDatabase  = new TaskDatabase(this.taskService);
  dataSource;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private taskService: TaskService,
    private router: Router
  ) {

    this.createNewTaskForm(); // Create new task form on start up
  }

  // Function to create new task form
  createNewTaskForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5),
        this.alphaNumericValidation
      ])],
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])]
    });
  }

  // Enable new task form
  enableFormNewTaskForm() {
    this.form.get('title').enable(); // Enable title field
    this.form.get('body').enable(); // Enable body field
  }

  // Disable new task form
  disableFormNewTaskForm() {
    this.form.get('title').disable(); // Disable title field
    this.form.get('body').disable(); // Disable body field
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

  // Function to display new Task form
  newTaskForm() {
    this.newTask = true; // Show new task form
  }

  // Reload Tasks on current page
  reloadTasks() {
    this.loadingTasks = true; // Used to lock button
    // window.location.reload();
    this.getAllTasks();
    // Get All Tasks
    setTimeout(() => {
      this.loadingTasks = false; // Release button lock after four seconds
    }, 4000);
  }

  // Function to submit a new task post
  ontaskSubmit() {
    this.processing = true; // Disable submit button
    this.disableFormNewTaskForm(); // Lock form
    // Create task object from form fields
    const task = {
      title: this.form.get('title').value, // Title field
      body: this.form.get('body').value, // Body field
      createdBy: this.username // CreatedBy field
    };

    // Function to save task into database
    this.taskService.newTask(task).subscribe(data => {
      // Check if task was saved to database or not
      if (!data.success) {
        this.messageClass = 'alert alert-danger'; // Return error class
        this.message = data.message; // Return error message
        this.processing = false; // Enable submit button
        this.enableFormNewTaskForm(); // Enable form
      } else {
        this.messageClass = 'alert alert-success'; // Return success class
        this.message = data.message; // Return success message
        this.getAllTasks();
        // Clear form data after two seconds
        setTimeout(() => {
          this.newTask = false; // Hide form
          this.processing = false; // Enable submit button
          this.message = false; // Erase error/success message
          this.form.reset(); // Reset all form fields
          this.enableFormNewTaskForm(); // Enable the form fields
        }, 2000);
      }
    });
  }
  // Function to go back to previous page
  goBack() {
    window.location.reload(); // Clear all variable states
    // this.router.navigate(['/task']);
  }

    // Function to get all tasks from the database
    getAllTasks() {
      // Function to GET all tasks from database
      this.taskService.getAllTasks().subscribe(results => {
        // this.taskPosts = data.tasks; // Assign array to use in HTML
        if (!results) {
          return;
        }
        this.dataSource = new MatTableDataSource(results.tasks);
        this.dataSource.sort = this.sort;
      });
    }
    // FUNCTION TO FILTER
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // GET ALL USERS
  getAllUsers() {
    this.authService.getAllUsers().subscribe(users => {
      this.users = users.users;
    });
  }
  assign(taskId, regForm) {
    const assignedTo = {
      assignedTo : regForm.assignedTo.username
    };
    this.taskService.updateTask(taskId, assignedTo).subscribe();
  }
  ngOnInit() {
    // Get profile username on page load
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Used when creating new task posts and comments
      this.role = profile.user.isAdmin;
    });
    this.getAllTasks();
    this.getAllUsers();
  }
}
