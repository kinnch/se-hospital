import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PrescriptionService } from '../../services/prescription.service';
import { PrescriptionListElement } from '../../models/prescription-list-element';

@Component({
    selector: 'prescription-request-c',
    template: require('./prescription-request.component.html'),
    styles: [require('./prescription-request.component.css')]
})

export class PrescriptionRequestComponent{
    role: string = 'pharmacist';
    isReject : boolean = false;
    department: string = '1';
    data: any; 
    selectedTab : string = '1';
    status1: boolean = false;
    status2: boolean = false;
    status3: boolean = false;

    constructor(private router: Router, private prescriptionService: PrescriptionService) {
    //     this.data = prescriptionService.getPrescriptionRequestForPharmacist();
    //     //this.prescriptionService.getPrescriptionElements().then(data => this.data = data);
    //    console.log('------');
    //     console.log(this.data);
    }
   
    ngOnInit(): void {
        this.prescriptionService.getPrescriptionRequestForPharmacist()
        .then((preData)=>{
           preData.some((pres)=>{
                if(!this.status1){
                    if(pres['drugPrescription'].status == 1) this.status1 = true;
                }
                if(!this.status2){
                    if(pres['drugPrescription'].status == 2) this.status2 = true;
                }
                if(!this.status3){
                    if(pres['drugPrescription'].status == 3) this.status3 = true;
                }
                return this.status1 && this.status2 && this.status3;   
            }) 

            this.data = preData;
        })
    }

    
}
