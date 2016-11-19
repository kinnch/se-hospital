import {Component, Input , Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PrescriptionListElement } from '../../models/prescription-list-element';
import { PrescriptionTableComponent } from '../PrescriptionTableComponent/prescription-table.component';
import { PrescriptionService } from '../../services/prescription.service';
import { UserService } from '../../services/user.service';


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

    constructor(private router: Router, private prescriptionService: PrescriptionService) {
        router.events.subscribe((val) => {
            this.prescriptionID = localStorage.getItem('user_id');
        });    
    }

    seeHistory(hn):void{
        this.router.navigate(['manage','prescription_request',hn]);
    }

    edit(pres):void{
        this.router.navigate(['manage','edit_prescription', pres]);
    }

     ngOnInit(): void {
        var diffDuration = moment_.duration(moment_().diff(this.data.patient.birthDate));
        this.year = diffDuration.years();
        this.month = diffDuration.months();
       
     }
     submit(diag , pres): void {
         console.log("diag :",diag , "pres :  " , pres);
         
          this.prescriptionService.setPrescriptionRequestApprove(pres)
          .then((res) => {
               if (res.status == "success") {
                    this.data.drugPrescription.status =2;
                } else{
                    this.data.drugPrescription.status =1;
                }
            });
     }

     rejected(pres){
        this.prescriptionService.sendChangeRequest(pres, this.pharmaID, this.reason).
        then((res) => {
            if (res.status == "success") {
                    this.data.drugPrescription.status =0;
                } 
        })
     }



}
