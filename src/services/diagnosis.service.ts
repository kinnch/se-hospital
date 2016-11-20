import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { PrescriptionListElement } from '../models/prescription-list-element';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DiagnosisService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    getAllDiagnosisHistory(id:string) : Promise<JSON> {
            return this.http
                    .post('/api/patient/diagnosisHistory', JSON.stringify({id: id}), {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        return res.json();
                    });
    }
    getDiagnosisAndPhysicalCheck(diagnosisID:string) : Promise<JSON> {
            return this.http
                    .post('/api/getDiagnosisAndPhysicalCheck', JSON.stringify({diagnosisID: diagnosisID})
                    , {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        return res.json();
                    });
    }
    getAllDisease() : Promise<JSON> {
        return this.http
                    .get('/api/diseases')
                    .toPromise()
                    .then(data => {
                        return data.json();
                    });
    }
    addDiagnosis(data:any) : Promise<JSON> {
        return this.http
                    .post('/api/diagnosis/create', JSON.stringify(data)
                    , {headers: this.headers})
                    .toPromise()
                    .then(function(res){
                        return res.json();
                    });
    }
}