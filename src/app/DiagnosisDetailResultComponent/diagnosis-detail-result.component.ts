import {Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'diagnosis-detail-result-c',
    template: require('./diagnosis-detail-result.component.html'),
    styles: [require('./diagnosis-detail-result.component.css')]
})

export class DiagnosisDetailResultComponent {
    constructor(private router: Router) {}
      
}