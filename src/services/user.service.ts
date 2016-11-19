// user.service.ts
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
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
          console.log(res)
          localStorage.setItem('auth_token', res.auth_token);
          localStorage.setItem('user_id', res.user._id);
          localStorage.setItem('user_username', res.user.userName);
          localStorage.setItem('user_roleID', res.user.roleID);
          localStorage.setItem('user_title', res.user.name.title);
          localStorage.setItem('user_fname', res.user.name.fname);
          localStorage.setItem('user_lname', res.user.name.lname);
          localStorage.setItem('department_id', res.user.department);
          localStorage.setItem('user_sex',res.user.sex);
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

  search(idOrHN:string) : Promise<JSON> {
          return new Promise<JSON>(resolve =>
            setTimeout(resolve, 2000)) // delay 2 seconds
            .then(() =>  JSON.parse(idOrHN) );
        // return this.http
        //             .post('api/patient/search', JSON.stringify({key: idOrHN}), {headers: this.headers})
        //             .toPromise()
        //             .then(function(res){
        //                 return res.json();
        //             });
    }

    requestOTP(idOrHN:string) : Promise<JSON> {
          return new Promise<JSON>(resolve =>
            setTimeout(resolve, 2000)) // delay 2 seconds
            .then(() =>  JSON.parse(idOrHN) );
        // return this.http
        //             .post('api/patient/search', JSON.stringify({key: idOrHN}), {headers: this.headers})
        //             .toPromise()
        //             .then(function(res){
        //                 return res.json();
        //             });
    }
  
}