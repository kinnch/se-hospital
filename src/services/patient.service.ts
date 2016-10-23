import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Patient } from '../models/patient';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PatientService {
    // checkUser(): Patient {
    //     return {id: 1, name:"kinnch"};
    // }
    private apiUrl = 'api/patient/search';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    private apiUrlgetPatientTodayState = 'api/check-in-list';
    getPatientTodayState(department_name:string) : Promise<JSON> {
        return this.http
                    .post(this.apiUrlgetPatientTodayState, JSON.stringify({department: department_name}), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        return res.json();
                    });
    }
}