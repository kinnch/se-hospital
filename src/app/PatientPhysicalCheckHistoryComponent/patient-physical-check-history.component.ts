import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'patient-physical-check-history-c',
    template: require('./patient-physical-check-history.component.html'),
    styles: [require('./patient-physical-check-history.component.css')]
})

export class PatientPhysicalCheckHistoryComponent {
    constructor(private router: Router) { }
    goback(): void {
        window.history.back();
    }
}