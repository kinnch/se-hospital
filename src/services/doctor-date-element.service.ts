import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class DoctorDateElement {
    
    constructor(private http: Http) {}

    getDoctorDateElements() {
        return {
            id: 1,
            title: "hackathon",
            start: "2016-01-22T16:00:00",
            end: "2016-01-22T18:00:00",
            allDay: true,
        };
    }
}
