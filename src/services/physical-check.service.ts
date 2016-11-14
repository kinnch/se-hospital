import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PhysicalCheckService {
    private apiUrl = 'api/physicalData/add';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    addPhysicalCheck(systolic:number,diastolic:number,heartRate:number,weight:number,height:number,temp:number,HN:string) : Promise<string> {
        return this.http
                    .post(this.apiUrl, JSON.stringify({systolic: systolic,diastolic:diastolic,heartRate:heartRate,weight:weight,height:height,temp:temp,HN:HN}), {headers: this.headers})
                    .toPromise()
                    .then(res => {
                        return "success";
                    });
    }
}