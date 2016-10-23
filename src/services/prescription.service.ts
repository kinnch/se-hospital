import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { PrescriptionListElement } from '../models/prescription-list-element';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PrescriptionService {
    
    private apiUrl = 'app/prescription/today';  // URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    getPrescriptionElements2(): Promise<PrescriptionListElement[]> {
    return this.http.get(this.apiUrl)
               .toPromise()
               .then(response => response.json().data as PrescriptionListElement[])
               .catch(this.handleError);
    }
    getPrescriptionElements() : PrescriptionListElement[] {
        return [
            {
            id: 1,
            doctor:{
                id: 1,
                title: "นพ.",
                firstName: "string",
                lastName: "string",
                department: "string"
            },
            patient: {
                id: 1,
                title: "string", 
                firstName: "string",
                lastName: "string",
                HN: "string",
                sex: "string",
                birthdate: new Date("10-01-1995"),
                age: '12ปี',
                allegicTo: "string"
            },
            status: 0,
            prescriptionList: [
                {
                id: 1,
                drugName: 'mydrug',
                amount: 100,
                manual: 'use with caution'
                }
            ]
            },
            {
            id: 2,
            doctor:{
                id: 2,
                title: "นพ.",
                firstName: "string",
                lastName: "string",
                department: "string"
            },
            patient: {
                id: 2,
                title: "string", 
                firstName: "string",
                lastName: "string",
                HN: "string",
                sex: "string",
                birthdate: new Date("10-01-1995"),
                age: '12ปี',
                allegicTo: "string"
            },
            status: 1,
            prescriptionList: [
                {
                id: 1,
                drugName: 'mydrug',
                amount: 100,
                manual: 'use with caution'
                }
            ]
            },
            {
            id: 3,
            doctor:{
                id: 3,
                title: "นพ.",
                firstName: "string",
                lastName: "string",
                department: "string"
            },
            patient: {
                id: 3,
                title: "string", 
                firstName: "string",
                lastName: "string",
                HN: "string",
                sex: "string",
                birthdate: new Date("10-01-1995"),
                age: '12ปี',
                allegicTo: "string"
            },
            status: 2,
            prescriptionList: [
                {
                id: 1,
                drugName: 'mydrug',
                amount: 100,
                manual: 'use with caution'
                }
            ]
            }
        ]; 
        
    }
}