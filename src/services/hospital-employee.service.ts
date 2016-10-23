import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HospitalEmployeeService {
    private apiUrl = 'api/employees';  // URL to web api
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
}