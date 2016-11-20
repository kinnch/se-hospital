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
    timeTable = [];
    rawSchedule = [];

    selectedDepartment = '';
    selectedDoctor = '';

    isAm = true;
    isPm = true;

    isDateChecked = [true,true,true,true,true,true,true];

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

    getAllList():void{
        this.DepartmentService.getAllSchedule(this.selectedDepartment).then((data)=>{
            this.rawSchedule = data;
        })
    }

    getDoctorList():void{
        this.DepartmentService.getAllDoctor(this.selectedDepartment).then((doctors)=>{
            this.doctors = doctors;
        })
        this.getAllList();
        this.setTimeTable();
    }

    setTimeTable():void{
        this.timeTable = [];
            
        for(var i = 0; i < this.rawSchedule.data.length; i++){
            if(!this.isAm && this.rawSchedule.data[i].timePeriod == 'am') continue;
            if(!this.isPm && this.rawSchedule.data[i].timePeriod == 'pm') continue;

            if(!this.isDateChecked[(new Date(this.rawSchedule.data[i].date)).getDay()]) continue;

            this.timeTable.push({
                text: moment(this.rawSchedule.data[i].date).format('DD-MM-YYYY') + ' - ' + ((this.rawSchedule.data[i].timePeriod == 'am')? 'ช่วงเช้า':'ช่วงบ่าย'),
                _id: this.rawSchedule.data[i]._id
            });  
        }
    }

    getTimeTable():void{
        //console.log(this.selectedDoctor);
        this.DepartmentService.getDoctorSchedule(this.selectedDoctor).then((timeTable)=>{
            this.rawSchedule = timeTable;
            this.setTimeTable();
        })
    }

    goBack(): void {
        this.location.back();
    }
}
