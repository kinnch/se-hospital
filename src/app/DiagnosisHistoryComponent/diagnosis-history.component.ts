import {Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'diagnosis-history-c',
    template: require('./diagnosis-history.component.html'),
    styles: [require('./diagnosis-history.component.css')]
})

export class DiagnosisHistoryComponent {
    constructor(private router: Router) {}
    
}