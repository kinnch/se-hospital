import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DoctorDateElementService {
    
    private apiUrl = 'api/schedule/getTable';  
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {}

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getDoctorDateElements() : Promise<JSON> {
         return this.http
                    .post(this.apiUrl, {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        return res.json();
                    });
    }
}
