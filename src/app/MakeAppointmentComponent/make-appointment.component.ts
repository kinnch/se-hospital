import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DepartmentService } from '../../services/department.service';
import {Subscription } from 'rxjs';


import * as moment_ from 'moment';
// departments: string[] = [];

@Component({
    selector: 'make-appointment-c',
    template: require('./make-appointment.component.html'),
    styles: [require('./make-appointment.component.css')]
})

export class MakeAppointComponent implements OnInit{
    private subscription: Subscription;

    departments = [];
    doctors = [];
    timeTable = [];
    rawSchedule = [];

    selectedDepartment = '';
    selectedDoctor = 'non';
    selectTime = '';

    reason = '';

    isAm = true;
    isPm = true;

    isDateChecked = [true,true,true,true,true,true,true];

    isTimeRangeChecked = [true, true, true];

    isWalkIn:boolean = false;

    //----Var to use----
    enableGod = false;//staff 15-20 is OK
    mode = '';//create_appointment_s.edit_appointment_s,create_appointment,edit_appointment
    patientID = '';
    aptID = '';//appointmentID in case edit
    //--------
    cannotBook = true;
    constructor(private router: Router,
                private location: Location,
                private DepartmentService: DepartmentService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit():void{
        moment_.locale('th');
        this.DepartmentService.getAllDepartments().then((departments)=>{
            this.departments = departments['departments'];
            console.log(this.departments)
        });
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.mode = param['mode'];
                this.patientID = param['id'];
                this.aptID = param['aptID'];
                if(this.mode=='create_appointment_s' || this.mode == 'edit_appointment_s'){
                    this.enableGod = true;
                }
                
        });
    }

      ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

    getAllList():void{
        console.log('getAllList');
        console.log(this.isWalkIn);
        console.log(this.selectedDepartment);
        this.DepartmentService.getAllSchedule(this.selectedDepartment, this.isWalkIn).then((data)=>{
            this.rawSchedule = data;
            this.setTimeTable();
        })
    }

    getDoctorList():void{
        console.log('getDoctorList');
        this.DepartmentService.getAllDoctor(this.selectedDepartment).then((doctors)=>{
            this.doctors = doctors;
            this.doctors.splice(0,0,{
                name: {
                    title: '-',
                    fname: 'ไม่ระบุแพทย์',
                    lname: '-'
                },
                _id: "non"
            });
        })
        this.getAllList();
    }

    setTimeTable():void{
        console.log('setTimeTable');
        this.timeTable = [];
        var mem = {};
                   
        for(var i = 0; i < this.rawSchedule.data.length; i++){
            if(!this.isAm && this.rawSchedule.data[i].timePeriod == 'am') continue;
            if(!this.isPm && this.rawSchedule.data[i].timePeriod == 'pm') continue;

            if(!this.isDateChecked[(new Date(this.rawSchedule.data[i].date)).getDay()]) continue;

            var appointmentWeek = new Date(moment(this.rawSchedule.data[i].date).format('YYYY-MM-DD')).getTime();
            var todayWeek =  new Date(moment().format('YYYY-MM-DD')).getTime();
            var weeks = parseInt((appointmentWeek - todayWeek)/604800000);

            if(weeks > 2) weeks = 2;

            //console.log(this.isTimeRangeChecked[0]);
            if(!this.isTimeRangeChecked[weeks]) continue;
            
            if(mem[moment(this.rawSchedule.data[i].date).format('DD-MM-YYYY') + this.rawSchedule.data[i].timePeriod]) continue;
            mem[moment(this.rawSchedule.data[i].date).format('DD-MM-YYYY') + this.rawSchedule.data[i].timePeriod] = true;
            this.timeTable.push({
                text: moment_(this.rawSchedule.data[i].date).format('ll') + ' - ' + ((this.rawSchedule.data[i].timePeriod == 'am')? 'ช่วงเช้า':'ช่วงบ่าย'),
                _id: this.rawSchedule.data[i]._id
            });  
        }
        this.selectTime = this.timeTable[0]._id;

    }

    getTimeTable():void{
        console.log('getTimeTable');
        if(this.selectedDoctor == 'non'){
            this.getAllList();
            return;
        }
        console.log(this.isWalkIn);
        console.log(this.selectedDoctor);
        this.DepartmentService.getDoctorSchedule(this.selectedDoctor, this.isWalkIn).then((timeTable)=>{
            this.rawSchedule = timeTable;
            this.setTimeTable();
        })
    }
    
    save(): void{
        console.log('save');
        //this.DepartmentService.saveData(this.selectTime, localStorage.getItem('patient_id'), this.reason);
    }

    goBack(): void {
        this.location.back();
    }
}
