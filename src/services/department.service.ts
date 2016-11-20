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
    getAllDoctor(departmentID : string): Promise<JSON>{
        return this.http
        .post('api/hospitalEmployee/getAllDoctorInDepartment', JSON.stringify({
            departmentID: departmentID
            }), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        console.log(res.json());
                        return res.json();
                    });
    }

    getDoctorSchedule(doctorID : string, isWalkIn: boolean): Promise<JSON>{
        return this.http
        .post('api/doctorAvailable', JSON.stringify({
            doctor_id: doctorID,
            isWalkIn: isWalkIn
            }), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        return res.json();
                    });
    }

    getAllSchedule(departmentID : string, isWalkIn: boolean):  Promise<JSON>{
        return this.http
        .post('/api/schedule/all', JSON.stringify({
            departmentID: departmentID,
            isWalkIn: isWalkIn
            }), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        return res.json();
                    });
    }

    saveData(schedule_id: string, patient_id: string, reason: string):Promise<JSON>{
        return this.http
        .post('/api/appointment/create', JSON.stringify({
            schedule_id: schedule_id,
            patient_id: patient_id,
            reason: reason
            }), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        return res.json();
                    });
    }
    /*
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
    */
}