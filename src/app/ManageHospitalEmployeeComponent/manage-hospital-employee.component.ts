import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { ModalComponent } from '../ModalComponent/modal.component';
@Component({
    selector: 'manage-hospital-employee-c',
    template: require('./manage-hospital-employee.component.html'),
    styles: [require('./manage-hospital-employee.component.css')]
})

export class ManageHospitalEmployeeComponent{
    constructor(private router: Router) {
    }
    gotoAddStaff():void{
        this.router.navigate(['manage','add_staff']);
    }
}
