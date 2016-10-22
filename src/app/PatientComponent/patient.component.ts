import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
@Component({
    selector: 'patient-c',
    template: require('./patient.component.html'),
    // styles: [require('./patient.component.css')]
})

export class PatientComponent{
    constructor(private router: Router) {
    }
}
