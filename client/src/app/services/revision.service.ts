import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
@Injectable()
export class RevisionService {

  domain = this.authService.domain;
  options;

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

  // Function to create a new REVISION
  newRevision(revision) {
    this.authService.createAuthenticationHeaders(); // Create headers
    return this.http.post(this.domain + 'revisions/newRevision', revision, this.authService.options).map(res => res.json());
  }

  // FUNCTION TO GET ALL REVISION FOR PARTICULAR USER
  getAllRevisionforUseruse(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'revisions/allRevision/' + id, this.options).map(res => res.json());
  }


  getAllRevisionOnTaskId(id) {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'revisions/allTaskRevision/' + id, this.authService.options).map(res => res.json());

  }

  // Function to post a comment on a revision post
  postComment(id, comment) {
    this.createAuthenticationHeaders(); // Create headers
    // Create revisionData to pass to backend
    const revisionData = {
      id: id,
      comment: comment
    };
    return this.http.post(this.domain + 'revisions/comment', revisionData, this.options).map(res => res.json());

  }
}
