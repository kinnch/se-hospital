import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
@Component({
    selector: 'manage-hospital-employee-c',
    template: require('./manage-hospital-employee.component.html'),
    styles: [require('./manage-hospital-employee.component.css')]
})

export class ManageHospitalEmployeeComponent{
    constructor(private router: Router) {
    }
}
