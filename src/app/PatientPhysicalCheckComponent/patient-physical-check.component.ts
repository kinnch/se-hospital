import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PhysicalCheckService } from '../../services/physical-check.service';
import { AppointmentService } from '../../services/appointment.service';
import * as moment_ from 'moment';
import { ToastComponent } from '../ToastComponent/toast.component';
import {Subscription } from 'rxjs';

@Component({
    selector: 'patient-physical-check-c',
    template: require('./patient-physical-check.component.html'),
    styles: [require('./patient-physical-check.component.css')]
})

export class PatientPhysicalCheckComponent implements OnInit {
    @ViewChild(ToastComponent) toast: ToastComponent;
    physicalData = [];
    systolic: number;
    diastolic: number;
    heartRate: number;
    weight: number;
    height: number;
    temp: number;
    HN: string;
    isAdd: boolean = false;
    buttonName: string = 'บันทึก';
    userRoleId = "";
    departmentId = "";
    private subscription: Subscription;
    constructor(private router: Router, 
                private physicalCheckService: PhysicalCheckService,
                private appointmentService: AppointmentService,
                private activatedRoute: ActivatedRoute,
                ) { }
    ngOnInit(): void {
        this.departmentId = localStorage.getItem('department_id')
            //TODO : departmentId
            this.departmentId = '';
        this.userRoleId = localStorage.getItem('user_roleID');
        moment_.locale('th');
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.HN = param['hn'];
                console.log(this.HN);
         });
        this.physicalCheckService.getPhysicalCheckHistory(this.HN).then((physicalData)=>{
            let physicalArray = [];
            console.log(">>",physicalData)            
            physicalData['physical_check'].forEach((phy)=>{             
                if(moment_(phy.date).format('ll') == moment_().format('ll')){
                    this.systolic = phy.bloodPresure.systolic;
                    this.diastolic = phy.bloodPresure.diastolic;
                    this.heartRate = phy.heartRate;
                    this.weight = phy.weight;
                    this.height = phy.height;
                    this.temp = phy.temp;
                    this.isAdd = true;
                    this.buttonName = "แก้ไข"
                }
                else{
                    phy.date = moment_(phy.date).format('ll'); 
                    physicalArray.push(phy);
                }
            })
            this.physicalData = physicalArray
        });
    }
    addPhysicalCheck() {
        if(this.buttonName === "บันทึก"){
            this.physicalCheckService.addPhysicalCheck(this.systolic, this.diastolic, this.heartRate, this.weight, this.height, this.temp, this.HN)
            .then((res) => {
                if (res == "success") {
                    var hours = new Date().getHours();
                    var hours = (hours+24-2)%24; 
                    var mid='am';
                    if(hours==0){ //At 00 hours we need to show 12 am
                        hours=12;
                    }
                    else if(hours>12){
                        hours=hours%12;
                        mid='pm';
                    }
                    this.appointmentService.getTodayAppointments(this.departmentId,'am').then((data)=>{
                        console.log("data",data)
                        var appointmentId = "";
                        var scheduleList = data['scheduleList'];
                        if(scheduleList){
                            scheduleList.forEach((schedule)=>{
                                if(schedule.appointments[0]){
                                    var appointments = schedule.appointments;
                                    appointments.forEach((appointment)=>{
                                        if(appointment.patient.HN == this.HN){
                                            appointmentId = appointment._id;
                                        }
                                    })
                                }
                            });
                        }
                        this.physicalCheckService.changeAppointmentStatus(appointmentId).then((res)=>{
                            if(res['status'] != "success"){
                                this.toast.addToastError(); 
                                console.log("ไม่สามารถเปลี่ยน state ได้")                            
                            }
                        })
                    });
                    this.isAdd = !this.isAdd;
                    this.buttonName = 'แก้ไข'
                    this.toast.titleSuccess = "บันทึกสำเร็จ"
                    this.toast.messageSuccess = "ทำการบันทึกข้อมูลเรียบร้อยแล้ว";
                    this.toast.addToastSuccess();
                }
                else{
                    this.toast.addToastError();                    
                }
            });
        }
        else if(this.buttonName === "แก้ไข"){
            this.isAdd = !this.isAdd;
            this.buttonName = "บันทึกการแก้ไข"        
        }
        else if(this.buttonName === "บันทึกการแก้ไข"){
            this.physicalCheckService.editPhysicalCheck(this.systolic, this.diastolic, this.heartRate, this.weight, this.height, this.temp, this.HN)
            .then((res) => {
                if (res == "success") {
                    this.isAdd = !this.isAdd;
                    this.buttonName = 'แก้ไข'
                    this.toast.titleSuccess = "บันทึกสำเร็จ"
                    this.toast.messageSuccess = "ทำการบันทึกข้อมูลเรียบร้อยแล้ว";
                    this.toast.addToastSuccess();    
                }
                else{
                    this.toast.addToastError();
                }
            });
        }
    }
}