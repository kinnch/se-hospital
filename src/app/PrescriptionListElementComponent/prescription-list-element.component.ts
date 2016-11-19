import {Component, Input , Output, EventEmitter, ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PrescriptionListElement } from '../../models/prescription-list-element';
import { PrescriptionTableComponent } from '../PrescriptionTableComponent/prescription-table.component';
import { PrescriptionService } from '../../services/prescription.service';
import { UserService } from '../../services/user.service';
import { ToastComponent } from '../ToastComponent/toast.component';


import * as moment_ from 'moment';
@Component({
    selector: 'prescription-list-element-c',
    template: require('./prescription-list-element.component.html'),
    styles: [require('./prescription-list-element.component.css')]
})

export class PrescriptionListElementComponent{
    @Input() data ; //(0)หมอต้องแก้ Doctor needs to edit (1)หมอจ่ายมา Doctor prescipe, (2)เภสัชจ่ายแล้ว 
    year: number;
    month: number;

    reason: string;
    pharmaID = localStorage.getItem('user_id');

    @Output() dataChange = new EventEmitter();
    @ViewChild( ToastComponent ) toast: ToastComponent;

    constructor(private router: Router, private prescriptionService: PrescriptionService) {
        router.events.subscribe((val) => {
            this.pharmaID = localStorage.getItem('user_id');
        });    
    }

    seeHistory(hn):void{
        this.router.navigate(['manage','prescription_request',hn]);
    }

    edit(pres):void{
        console.log('click edit prescription');
        console.log(pres);
        this.router.navigate(['manage','edit_prescription', pres]);
    }

     ngOnInit(): void {
        var diffDuration = moment_.duration(moment_().diff(this.data.patient.birthDate));
        this.year = diffDuration.years();
        this.month = diffDuration.months();
       
     }
     //Approve 
     submit(diag , pres): void {
         console.log("diag :",diag , "pres :  " , pres);
         
          this.prescriptionService.setPrescriptionRequestApprove(pres)
          .then((res) => {
               if (res.status == "success") {
                    this.data.drugPrescription.status =2;
                    this.toast.titleSuccess="อนุมัติการจ่ายยาสำเร็จ";
                    this.toast.messageSuccess="";
                    this.toast.addToastSuccess();
                } else{
                    this.data.drugPrescription.status =1;
                    this.toast.addToastError();
                }
            });
     }
     // submit
     finalSubmit(diag , pres){
         this.prescriptionService.setPrescriptionRequestDone(pres)
        .then((res) => {
               if (res.status == "success") {
                    this.data.drugPrescription.status =3;
                    this.toast.titleSuccess="การจ่ายยาสำเร็จ";
                    this.toast.messageSuccess="";
                    this.toast.addToastSuccess();
                } else{
                    this.data.drugPrescription.status =2;
                    this.toast.addToastError();
                }
            });
     }

     rejected(pres){
        this.prescriptionService.sendChangeRequest(pres, this.pharmaID, this.reason).
        then((res) => {
            if (res.status == "success") {
                    this.data.drugPrescription.status =0;
                    this.toast.titleSuccess="ส่งคำร้องสำเร็จ";
                    this.toast.messageSuccess="";
                    this.toast.addToastSuccess();
                } else{
                    this.toast.messageError = "กรุณาส่งคำร้องใหม่อีกครั้ง";
                    this.toast.addToastError();
                }
        })
     }



}
