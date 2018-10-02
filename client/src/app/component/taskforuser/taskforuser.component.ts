import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { MatPaginator, MatSort, MatSortable, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-taskforuser',
  templateUrl: './taskforuser.component.html',
  styleUrls: ['./taskforuser.component.css']
})
export class TaskforuserComponent implements OnInit {

  username = '';
  tasks;
  size = 0;
  displayedColumns = ['_id', 'title', 'body', 'createdBy', 'createdOn', 'submit'];
  dataSource;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: AuthService, private taskService: TaskService) { }


  // FUNCTION TO GET TASK BASED ON USER
  getTaskRelatedtoUser(assignedTo) {
    // Function to GET all tasks from database
    this.taskService.getTaskRelatedtoUser(assignedTo).subscribe(results => {
      // this.taskPosts = data.tasks; // Assign array to use in HTML
      if (!results) {
        return;
      }
      this.dataSource = new MatTableDataSource(results.tasks);
      this.size = this.dataSource.data.length;
      this.dataSource.sort = this.sort;
    });
  }

  // FUNCTION TO FILTER
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    // Once component loads, get user's data to display on profile
    this.authService.getProfile().subscribe(profile => {
      this.username = profile.user.username; // Set username
      this.getTaskRelatedtoUser(this.username);
    });
  }
}
