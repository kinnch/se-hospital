import {Component, Input,ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PatientAppointmentComponent } from '../PatientAppointmentComponent/patient-appointment.component';
import { AppointmentService } from '../../services/appointment.service';
import { ToastComponent } from '../ToastComponent/toast.component';
import { Router } from '@angular/router';
import * as moment_ from 'moment';

@Component({
    selector: 'manage-patient-c',
    template: require('./manage-patient.component.html'),
    styles: [require('./manage-patient.component.css')]
})

export class ManagePatientComponent{
    errorTitle = "";
    @ViewChild( ToastComponent ) toast: ToastComponent;
    hnOrIDinput:string;
    found:boolean = false;
    constructor(private router: Router, private appointmentService: AppointmentService) {
    }
    data;
    getPatientAndAppointment(){
        // console.log(this.hnOrIDinput);
        moment_.locale('th');

        this.appointmentService.getPatientAndAppointment(this.hnOrIDinput)
        .then((data) => {
            // console.log('then');
            console.log(data);
            if(data['status']=='not found'){
                this.found = false;
                this.toast.titleError = "กรอกข้อมูลผิดหรือไม่ครบ";
                this.toast.messageError = "กรุณากรอก HN(8 หลัก) หรือ รหัสประจำตัวประชาชน​(13 หลัก)";
                this.toast.addToastError();
            } else if (data['msg'] == 'patient not found' ){
                this.toast.titleError = "ไม่พบผู้ป่วยที่ต้องการค้นหา";
                this.toast.messageError = "กรุณาตรวจสอบความถูกต้องอีกครั้ง";
                this.toast.addToastError();
            }
            else{
                for(var i =0; i < data.appoint.length ; i++){
                data['appoint'][i]['date2'] = moment_(data['appoint'][i]['date']).format('ll');
                if( data['appoint'][i]['timePeriod'] == "pm" ){
                    data['appoint'][i]['timePeriod2'] = "ช่วงบ่าย"
                }else if( data['appoint'][i]['timePeriod'] == "am" ){
                    data['appoint'][i]['timePeriod2'] = "ช่วงเช้า"
                }
                    
                
            }
            this.data = data;
            this.found = true;    
            }
            
        });
    }
    ngOnChanges(changes: any) {
         if (changes['hnOrIDinput']) { // fire your event 
            this.validate(); 
            }
    }
    validateSearch(value){
        this.validate();
    }
    validate():boolean{
        console.log('validate');
        let isPass = true;
        if(this.hnOrIDinput == ""){
               this.errorTitle = "กรุณากรอกรหัสประจำตัวผู้ป่วย(8หลัก) หรือรหัสประจำตัวประชาชน(ตัวเลข 13หลัก)";
        }
        else if(!/^........$/.test(this.hnOrIDinput) && !/^\d{13}$/.test(this.hnOrIDinput)){
            this.errorTitle = "กรุณากรอกรหัสประจำตัวผู้ป่วย(8หลัก) หรือรหัสประจำตัวประชาชน(ตัวเลข 13หลัก)"
        } 
        else {
            this.errorTitle = "";
            isPass = true;
        }
        return isPass;
    }
}
