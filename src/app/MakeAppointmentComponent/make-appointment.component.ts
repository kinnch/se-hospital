import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DepartmentService } from '../../services/department.service';
// departments: string[] = [];

@Component({
    selector: 'make-appointment-c',
    template: require('./make-appointment.component.html'),
    styles: [require('./make-appointment.component.css')]
})

export class MakeAppointComponent implements OnInit{
    departments = [];
    doctors = [];
    constructor(private router: Router,
                private location: Location,
                private DepartmentService: DepartmentService) {
    }
    ngOnInit():void{
        this.DepartmentService.getAllDepartments().then((departments)=>{
            this.departments = departments['departments'];
            console.log(this.departments)
        });
    }

    goBack(): void {
        this.location.back();
    }
}
