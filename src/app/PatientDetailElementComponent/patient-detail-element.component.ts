import {Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'patient-detail-element-c',
    template: require('./patient-detail-element.component.html'),
    styles: [require('./patient-detail-element.component.css')]
})

export class PatientDetailElementComponent {
    constructor(private router: Router) {}
      
}