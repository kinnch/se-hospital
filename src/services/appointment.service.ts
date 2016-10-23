import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { PrescriptionListElement } from '../models/prescription-list-element';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppointmentService {
    private apiUrl = 'api/patient/search';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    getPatientAndAppointment(idOrHN:string) : Promise<JSON> {
        return this.http
                    .post(this.apiUrl, JSON.stringify({key: idOrHN}), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        return res.json();
                    });
    }
    private apiUrlTodayAppointment = 'api/appointment/all';
    getTodayAppointments(department:string):Promise<JSON>{
        console.log({department: department});
        return this.http
                    .post(this.apiUrlTodayAppointment, JSON.stringify({department: department}), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        return res.json();
                    });
    }
}