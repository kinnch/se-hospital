import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { PrescriptionListElement } from '../models/prescription-list-element';

@Injectable()
export class PrescriptionService {
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
            status: 3,
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