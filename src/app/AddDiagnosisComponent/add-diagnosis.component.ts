import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'add-diagnosis-c',
    template: require('./add-diagnosis.component.html'),
    styles: [require('./add-diagnosis.component.css')]
})

export class AddDiagnosisComponent {
    constructor(private router: Router) { }
    goback(): void {
        window.history.back();
    }
}