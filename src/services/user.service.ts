// user.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class UserService {
  private loggedIn = false;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(username, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let dataToSend:any =  {
            "username": username,
            "password": password
            };
    console.log(dataToSend);
    return this.http
      .post(
        '/login', 
        JSON.stringify(dataToSend), 
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.auth_token);
          localStorage.setItem('user_username', res.user.userName);
          localStorage.setItem('user_roleID', res.user.roleID);
          localStorage.setItem('user_title', res.user.name.title);
          localStorage.setItem('user_fname', res.user.name.fname);
          localStorage.setItem('user_lname', res.user.name.lname);
          this.loggedIn = true;
        }

        return res.success;
      });
  }
  
  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}