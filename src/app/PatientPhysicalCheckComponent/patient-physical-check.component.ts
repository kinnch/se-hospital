import {Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'patient-physical-check-c',
    template: require('./patient-physical-check.component.html'),
    styles: [require('./patient-physical-check.component.css')]
})

export class PatientPhysicalCheckComponent {
    constructor(private router: Router) {}
}