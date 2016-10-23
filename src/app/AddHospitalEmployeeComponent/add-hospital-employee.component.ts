import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'add-hospital-employee-c',
    template: require('./add-hospital-employee.component.html'),
    styles: [require('./add-hospital-employee.component.css')]
})

export class AddHospitalEmployeeComponent {
    constructor(private router: Router) {}
    goback():void{
        window.history.back();
    }
}