import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'diagnosis-detail-c',
    template: require('./diagnosis-detail.component.html'),
    styles: [require('./diagnosis-detail.component.css')]
})

export class DiagnosisDetailComponent {
    constructor(private router: Router) { }
    goback(): void {
        window.history.back();
    }
}