import {Component} from '@angular/core';
import { Router } from '@angular/router';
import {Component, Input , Output} from '@angular/core';

@Component({
    selector: 'diagnosis-detail-result-c',
    template: require('./diagnosis-detail-result.component.html'),
    styles: [require('./diagnosis-detail-result.component.css')]
})

export class DiagnosisDetailResultComponent {
    @Input() disease;
    @Input() detail ; 

    constructor(private router: Router) {}
      
}