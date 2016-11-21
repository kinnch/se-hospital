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

    getDoctorDateElements() : Promise<any> {
         return this.http
                    .post('api/schedule/getTable', JSON.stringify({departmentID: localStorage.getItem('department_id'), doctorID:localStorage.getItem('user_id')}), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        return res.json();
                    }).catch(function(err){
                       console.log(err);
                       return {
                         
                       };
                    });
    }

    //  requestOTP(idOrHN:string) : Promise<JSON> {
    //       // return new Promise<JSON>(resolve =>
    //       //   setTimeout(resolve, 2000)) // delay 2 seconds
    //       //   .then(() =>  JSON.parse(idOrHN) );
    //     return this.http
    //                 .post('requestOTP', JSON.stringify({key: idOrHN}), {headers: this.headers})
    //                 .toPromise()
    //                 .then(function(res){
    //                     return res.json();
    //                 }).catch(function(err){
    //                    console.log(err);
    //                    return {
    //                      "success" : false
    //                    };
    //                 });
    // }
    searchSchedule(date,period) : Promise<any> {
         return this.http
                    .post('api/schedule/search', JSON.stringify({date: date,timePeriod : period, doctorID:localStorage.getItem('user_id')}), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        return res.json();
                    }).catch(function(err){
                       console.log(err);
                       return {
                         
                       };
                    });
    }
    // api/appointment/shift
    shift(appointmentID,date) : Promise<any> {
         return this.http
                    .post('api/appointment/shift', JSON.stringify({date: date,appointmentID :appointmentID, doctorID:localStorage.getItem('user_id')}), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        return res.json();
                    }).catch(function(err){
                       console.log(err);
                       return {
                         
                       };
                    });
    }
    removeSchedule(id) : Promise<any> {
         return this.http
                    .post('api/schedule/delete', JSON.stringify({scheduleID: id}), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        return res.json();
                    }).catch(function(err){
                       console.log(err);
                       return {
                         
                       };
                    });
    }

    getStaffElements() : Promise<any> {
         return this.http
                    .post('api/schedule/getTableStaff', JSON.stringify({departmentID: localStorage.getItem('department_id')}), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        return res.json();
                    }).catch(function(err){
                       console.log(err);
                       return {
                         
                       };
                    });
    }


}
