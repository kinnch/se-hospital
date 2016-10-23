import {Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'diagnosis-detail-resault-c',
    template: require('./diagnosis-detail-resault.component.html'),
    styles: [require('./diagnosis-detail-resault.component.css')]
})

export class DiagnosisDetailResaultComponent {
    constructor(private router: Router) {}
      
}