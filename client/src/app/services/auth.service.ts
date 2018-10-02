import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/observable/of';
@Injectable()
export class AuthService {

  domain = '';
  // domain = 'http://localhost:3000';
  authToken;
  user;
  options;
  role;

  constructor(private http: Http) {
  }

  registerUser(user) {
    return this.http.post(this.domain + 'authentication/register', user).map(res => res.json());
  }
  // Function to create headers, add token, to be used in HTTP requests
  createAuthenticationHeaders() {
    this.loadToken(); // Get token so it can be attached to headers
    // Headers configuration options
    this.options = new RequestOptions({
      headers : new Headers({
        'Content-Type': 'application/json', // Format set to JSON
        'authorization': this.authToken// Attach token
      })
    });

  }

  loadToken() {
    this.authToken = localStorage.getItem('token');
  }
  checkUsername(username) {
    return this.http.get(this.domain + 'authentication/checkUsername/' + username).map(res => res.json());
  }

  checkEmail(email) {
    return this.http.get(this.domain + 'authentication/checkEmail/' + email).map(res => res.json());
  }

  login(user) {
    return this.http.post(this.domain + 'authentication/login', user).map(res => res.json());
  }



  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
  storeUserData(token, user, role) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', role);
    this.authToken = token;
    this.user = user;
    this.role = role;
  }

  getProfile() {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + 'authentication/profile', this.options).map(res => res.json());
  }

  getAllUsers() {
    this.createAuthenticationHeaders(); // Create headers
    return this.http.get(this.domain + 'authentication/allUsers', this.options).map(res => res.json());
  }

  loggedIn() {
    return tokenNotExpired();
  }

}
