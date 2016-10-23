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
    data: PrescriptionListElement[]; 
    constructor(private router: Router, private prescriptionService: PrescriptionService) {
        this.data=prescriptionService.getPrescriptionElements();
        //this.prescriptionService.getPrescriptionElements().then(data => this.data = data);
        console.log(this.data);
    }
    dataAllPrescription;
    getAllPrescriptionRequest(){
        this.prescriptionService.getPrescriptionRequestForPharmacist(this.department)
        .then((data) => {
            console.log('then');
            console.log(data);
            this.dataAllPrescription = data;
        });
    }
    
}
