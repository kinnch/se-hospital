import {Component, Input, OnInit,  Output, EventEmitter,ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { ToastComponent } from '../ToastComponent/toast.component';
@Component({
    selector: 'patient-list-element-c',
    template: require('./patient-list-element.component.html'),
    styles: [require('./patient-list-element.component.css')]
})

export class PatientListElementComponent implements OnInit{
    @ViewChild( ToastComponent ) toast: ToastComponent;
    @Input() oneData;
    @Input() linkToWhere;
    @Output() checkinSuccess : EventEmitter<JSON> = new EventEmitter<JSON>();//: EventEmitter<JSON> = new EventEmitter<JSON>();// = new EventEmitter();
    constructor(private router: Router, private appointmentService : AppointmentService ) {
    }
    ngOnInit() {
    }
    checkIn(id:string){
        console.log(id);
        var self = this;
        // console.log("emitttttt");
        // this.checkinSuccess.emit('test');
        // console.log("emitttttted");
        this.appointmentService.checkInAppointment(id)
        .then((data)=>{
            console.log(data);
            if(data['status']=='success'){
                console.log('checkin passed');
                this.toast.titleSuccess = "ส่งเข้าพบแพทย์สำเร็จ"
                this.toast.messageSuccess = "";
                this.toast.addToastSuccess();
                console.log(this.oneData);
                var toBeSend = this.oneData;
                self.checkinSuccess.emit(toBeSend);
                
            }
        });

    }
}
