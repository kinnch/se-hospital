import {Component,Input} from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'patient-detail-element-c',
    template: require('./patient-detail-element.component.html'),
    styles: [require('./patient-detail-element.component.css')]
})

export class PatientDetailElementComponent {
    @Input() data:JSON;
    constructor(private router: Router) {}
      
}