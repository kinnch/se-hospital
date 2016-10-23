import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PrescriptionService } from '../../services/prescription.service';
import { PrescriptionListElement } from '../../models/prescription-list-element';
@Component({
    selector: 'edit-prescription-request-c',
    template: require('./edit-prescription-request.component.html'),
    styles: [require('./edit-prescription-request.component.css')]
})

export class EditPrescriptionRequestComponent{    
    role: string = 'doctor';
    data: PrescriptionListElement[]; 
    constructor(private router: Router, private prescriptionService: PrescriptionService) {
        this.data=prescriptionService.getPrescriptionElements();
        //this.prescriptionService.getPrescriptionElements().then(data => this.data = data);
        console.log(this.data);
    }

    gotoPage(hn):void{      
        this.router.navigate(['manage','prescription_request',hn]);
    }
}