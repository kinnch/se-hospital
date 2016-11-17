import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DepartmentService {
    private apiUrl = 'api/departments';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    getAllDepartments() : Promise<JSON> {
        return this.http
                    .get(this.apiUrl)
                    .toPromise()
                    .then(data => {
                        return data.json();
                    });
    }
    getAllDoctor(departmentID : string ,timePeriod : string): Promise<JSON>{
        return this.http
        .post('api/timeperiodDoctor', JSON.stringify({
            departmentID: departmentID,
            date: new Date().toISOString().slice(0, 10), 
            period: timePeriod
            }), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        return res.json();
                    });
    }
}