import {Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'patient-detail-c',
    template: require('./patient-detail.component.html'),
    styles: [require('./patient-detail.component.css')]
})

export class PatientDetailComponent {
    constructor(private router: Router) {}
    goback(): void{
        window.history.back();
    }
}