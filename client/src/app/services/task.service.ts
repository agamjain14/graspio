import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
// import { HttpClient } from '@angular/common/http';
import { Task } from '../shared/task';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TaskService {

  options;
  domain = this.authService.domain;

  constructor(
    private authService: AuthService,
    private http: Http
  ) { }

  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.authService.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authService.authToken // Attach token
      })
    });
  }


  // Function to create a new task
  newTask(task) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'tasks/newTask', task, this.options).map(res => res.json());
  }
  // Function to get all task from the database
  getAllTasks() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'tasks/allTasks', this.options).map(res => res.json());
  }

  // Function to get single task from the database
  getsingleTask(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'tasks/singleTask/' + id, this.options).map(res => res.json());
  }
  // Function to UPDATE single task from the database
  updateTask(id, assignedTo) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.put(this.domain + 'tasks/updateTask/' + id, assignedTo, this.options).map(res => res.json());
  }

  // FUNCTION TO GET TASK BASED ON USER
  getTaskRelatedtoUser(assignedTo) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'tasks/allTaskforuser/' + assignedTo , this.options).map(res => res.json());
  }
}
