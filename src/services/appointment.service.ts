import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { PrescriptionListElement } from '../models/prescription-list-element';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppointmentService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    getPatientAndAppointment(idOrHN:string) : Promise<JSON> {
        return this.http
                    .post('api/patient/search', JSON.stringify({key: idOrHN}), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        return res.json();
                    });
    }
    
    getTodayAppointments(departmentID :string, timePeriod : string):Promise<JSON>{
        return this.http
                    .post('api/departmentAppointment/byTime', JSON.stringify({
                        departmentID: departmentID,
                        date : new Date().toISOString().slice(0, 10),
                        timePeriod : timePeriod
                    }), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        return res.json();
                    });
    }
    /*  
            0 == created in website
            1 == ปรินท์ใบนัดแล้ว
            2 == ตรวจร่างกายแล้ว
            3 == ตรวจอยู่
            4 == ตรวจเสร็จ
        */
    checkInAppointment(appointmentID : string): Promise<JSON>{
        return this.http
                    .post('api/appointment/changeState', JSON.stringify({
                        appointmentID: appointmentID,
                        newState : 3
                    }), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        console.log(res.json());
                        return res.json();
                    });
    }
    diagnosisDoneAppointment(appointmentID : string): Promise<JSON>{
        return this.http
                    .post('api/appointment/changeState', JSON.stringify({
                        appointmentID: appointmentID,
                        newState : 4
                    }), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        console.log(res.json());
                        return res.json();
                    });
    }
    printAppointment(appointmentID : string): Promise<JSON>{
        return this.http
                    .post('api/appointment/changeState', JSON.stringify({
                        appointmentID: appointmentID,
                        newState : 1
                    }), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        console.log(res.json());
                        return res.json();
                    });
    }
}