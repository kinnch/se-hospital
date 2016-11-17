import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HospitalEmployeeService {
    private apiUrl = 'api/employees';  // URL to web api
    private apiAddUrl = 'register';
    private apiChangePassUrl = 'api/staff/changePassword';
    private apiRemoveStaffUrl = 'api/staff/deleteStaff';
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    getAllHospitalEmployees() : Promise<JSON> {
        return this.http
                    .get(this.apiUrl)
                    .toPromise()
                    .then(data => {
                        return data.json();
                    });
    }
    addHospitalEmployee(username,password,roleID,department,title,fname,lname) : Promise<string>{
        return this.http
                    .post(this.apiAddUrl, JSON.stringify({username:username,password:password,roleID:roleID,department:department,title:title,fname:fname,lname:lname}), {headers: this.headers})
                    .toPromise()
                    .then(res => {
                        return "success";
                    });
    }
    changePassword(id,password) : Promise<string>{
        return this.http
                    .post(this.apiChangePassUrl, JSON.stringify({id:id,password:password}), {headers: this.headers})
                    .toPromise()
                    .then(res =>{
                        return "success";
                    });
    }
    removeStaff(id) : Promise<string>{
        return this.http
                    .post(this.apiRemoveStaffUrl, JSON.stringify({id:id}), {headers: this.headers})
                    .toPromise()
                    .then(res =>{
                        return "success";
                    });
    }
}