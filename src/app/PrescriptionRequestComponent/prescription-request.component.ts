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
    constructor(private router: Router, private prescriptionService: PrescriptionService) {
    //     this.data = prescriptionService.getPrescriptionRequestForPharmacist();
    //     //this.prescriptionService.getPrescriptionElements().then(data => this.data = data);
    //    console.log('------');
    //     console.log(this.data);
    }
   
    ngOnInit(): void {
        this.prescriptionService.getPrescriptionRequestForPharmacist()
        .then((preData)=>{
            
            this.data = preData;
            // console.log('------------');
            // console.log(this.data);
        });
    }

    
}
