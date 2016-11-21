import {Component, Input, OnInit,ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DepartmentService } from '../../services/department.service';
import { AppointmentService} from '../../services/appointment.service';
import {Subscription } from 'rxjs';
import { ModalComponent } from '../ModalComponent/modal.component';
import {NotificationService} from '../../services/notification.service';


import * as moment_ from 'moment';
// departments: string[] = [];

@Component({
    selector: 'make-appointment-c',
    template: require('./make-appointment.component.html'),
    styles: [require('./make-appointment.component.css')]
})

export class MakeAppointComponent implements OnInit{
    @ViewChild( ModalComponent ) modal: ModalComponent;
    private subscription: Subscription;
    modalBody = '';
    modalTitle='';
    departments = [];
    doctors = [];
    timeTable = [];
    rawSchedule = [];

    selectedDepartment = null;
    selectedDoctor = 'non';
    selectTime = null;

    headerText = 'เพิ่มนัดหมายใหม่';
    reason = '';
    errorMSG = '';

    isAm = true;
    isPm = true;

    oldDate:Date = null;
    oldPeriod = '';

    isDateChecked = [true,true,true,true,true,true,true];

    isTimeRangeChecked = [true, true, true];

    isWalkIn:boolean = false;

    //----Var to use----
    enableGod = false;//staff 15-20 is OK
    mode = '';//create_appointment_s.edit_appointment_s,create_appointment,edit_appointment
    patientID = '';
    aptID = '';//appointmentID in case edit
    //--------
    constructor(private router: Router,
                private location: Location,
                private DepartmentService: DepartmentService,
                private activatedRoute: ActivatedRoute,
                private AppointmentService: AppointmentService,
                private NotificationService: NotificationService) {
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
                if(this.mode=='edit_appointment_s' || this.mode == 'edit_appointment'){
                    //fetch data.
                    this.headerText = 'เลื่อนนัดหมาย';
                    this.AppointmentService.getAppointmentInfo(this.aptID).then((data)=>{
                        this.reason = data.data.app.reason;
                        this.oldDate = data.data.detail.date;
                        this.oldPeriod = data.data.detail.timePeriod;
                        
                        //console.log(data.data.app);
                        this.selectedDepartment = data.data.detail.doctor.department._id;
                        this.getDoctorList();
                        this.selectedDoctor = data.data.detail.doctor._id;
                        this.getTimeTable();
                        this.selectTime = data.data.detail._id;
                    });
                }
        });
    }

      ngOnDestroy() {
        // prevent memory leak by unsubscribing
        this.subscription.unsubscribe();
      }

    getAllList():void{
        this.DepartmentService.getAllSchedule(this.selectedDepartment, this.isWalkIn).then((data)=>{
            this.rawSchedule = data;
            this.setTimeTable();
        })
    }

    getDoctorList():void{
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
        });
        this.selectedDoctor = 'non';
        this.getAllList();
    }

    setTimeTable():void{
        this.timeTable = [];
        var mem = {};
        this.errorMSG = '';
        this.selectTime = null;
        for(var i = 0; i < this.rawSchedule.data.length; i++){
            if(!this.isAm && this.rawSchedule.data[i].timePeriod == 'am') continue;
            if(!this.isPm && this.rawSchedule.data[i].timePeriod == 'pm') continue;

            if(!this.isDateChecked[(new Date(this.rawSchedule.data[i].date)).getDay()]) continue;

            var appointmentWeek = new Date(moment(this.rawSchedule.data[i].date).format('YYYY-MM-DD')).getTime();
            var todayWeek =  new Date(moment().format('YYYY-MM-DD')).getTime();
            if(parseInt(appointmentWeek - todayWeek) < 0) continue;
            var weeks = parseInt((appointmentWeek - todayWeek)/604800000);

            if(weeks > 2) weeks = 2;

            //console.log(this.isTimeRangeChecked[0]);
            if(!this.isTimeRangeChecked[weeks]) continue;
            
            if(mem[moment(this.rawSchedule.data[i].date).format('DD-MM-YYYY') + this.rawSchedule.data[i].timePeriod]) continue;
            mem[moment(this.rawSchedule.data[i].date).format('DD-MM-YYYY') + this.rawSchedule.data[i].timePeriod] = true;
            this.timeTable.push({
                text: moment_(this.rawSchedule.data[i].date).format('ll') + ' - ' + ((this.rawSchedule.data[i].timePeriod == 'am')? 'ช่วงเช้า (9.00 - 11.30)':'ช่วงบ่าย (13.00 - 15.30)'),
                _id: this.rawSchedule.data[i]._id
            });  
        }
        if(this.timeTable.length > 0)this.selectTime = this.timeTable[0]._id;
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
        //this.DepartmentService.saveData(this.selectTime, localStorage.getItem('patient_id'), this.reason);
        if(this.selectedDepartment == null){
            this.errorMSG = 'กรุณาเลือกแผนกที่ต้องการจะนัด';
            return;
        }
        if(this.selectTime == null){
            this.errorMSG = 'ไม่มีมีเวลาที่สามารถนัดได้ กรุณาเลือกเวลาอื่นๆ ';
            if(this.selectedDoctor != null) this.errorMSG += 'หรือแพทย์ท่านอื่น';
            this.errorMSG += 'ที่ระบบมีให้';
            return;
        }
        this.DepartmentService.saveData(this.selectTime,this.patientID,this.reason)
        .then((data)=>{
            console.log('----save----');
            console.log(data.data.appointmentID);
            //TODO: toast
            if(data['status']=='success'){
            this.AppointmentService.getAppointmentInfo(data.data.appointmentID).then((newAppointment)=>{
                    var patient = newAppointment.data.app.patient;
                    var doctor = newAppointment.data.detail.doctor;
                    var appTimePeriod = newAppointment.data.detail.timePeriod;
                    var appDate = newAppointment.data.detail.date;
                    var departmentName = doctor.department.name;
                    if(this.mode=='edit_appointment_s' || this.mode=='edit_appointment'){
                        //TODO delete old appointment (aptID)
                        //this.DepartmentService.deleteDate(this.aptID).then(data)
                        this.AppointmentService.deleteAppointment(this.aptID).then((data)=>{
                            this.NotificationService.sendSMSPostponeAppt(
                                patient.tel, 
                                patient.name.fname,
                                patient.name.lname,
                                doctor.name.fname,
                                doctor.name.lname,
                                departmentName, 
                                moment_(this.oldDate).format('ll'),
                                (this.oldPeriod == 'am')? "ช่วงเช้า(9.00 - 11.30)":"ช่วงบ่าย(13.00 - 15.30)",
                                moment_(appDate).format('ll'),
                                (appTimePeriod == 'am')? "ช่วงเช้า(9.00 - 11.30)":"ช่วงบ่าย(13.00 - 15.30)"
                            );
                            this.NotificationService.sendEmailPostponeAppt(
                                patient.email, 
                                patient.name.fname,
                                patient.name.lname,
                                doctor.name.fname,
                                doctor.name.lname,
                                departmentName, 
                                moment_(this.oldDate).format('ll'),
                                (this.oldPeriod == 'am')? "ช่วงเช้า(9.00 - 11.30)":"ช่วงบ่าย(13.00 - 15.30)",
                                moment_(appDate).format('ll'),
                                (appTimePeriod == 'am')? "ช่วงเช้า(9.00 - 11.30)":"ช่วงบ่าย(13.00 - 15.30)"
                            );
                            
                            this.modalTitle = 'ผลลัพธ์การเลื่อนนัด';
                            this.modalBody = 'เลื่อนนัดสำเร็จ'
                            this.modal.modalOpen();
                            //alert('แก้ไขการจองสำเร็จ');
                        });
                    }
                    else{ //moment_(this.rawSchedule.data[i].date).format('ll')
                        this.NotificationService.sendSMSCreateAppt(
                            patient.tel, 
                            patient.name.fname,
                            patient.name.lname,
                            doctor.name.fname,
                            doctor.name.lname,
                            departmentName,
                            moment_(appDate).format('ll'),
                            (appTimePeriod == 'am')? "ช่วงเช้า(9.00 - 11.30)":"ช่วงบ่าย(13.00 - 15.30)"
                        );
                        this.NotificationService.sendEmailCreateAppt(
                            patient.email,
                            patient.name.fname,
                            patient.name.lname,
                            doctor.name.fname,
                            doctor.name.lname,
                            departmentName,
                            moment_(appDate).format('ll'),
                            (appTimePeriod == 'am')? "ช่วงเช้า(9.00 - 11.30)":"ช่วงบ่าย(13.00 - 15.30)"
                        );
                        this.modalTitle = 'ผลลัพธ์การทำนัดหมาย';
                        this.modalBody = 'นัดหมายสำเร็จ'
                        this.modal.modalOpen();
                        // alert('ทำการจองสำเร็จ');
                    }
            });
            }
        });
    }

    goBack(): void {
        this.location.back();
    }
}
