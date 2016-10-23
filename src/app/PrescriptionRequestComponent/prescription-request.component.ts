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
    isReject : boolean = false;
    data: PrescriptionListElement[]; 
    constructor(private router: Router, private prescriptionService: PrescriptionService) {
        this.data=prescriptionService.getPrescriptionElements();
        console.log(this.data);
    }

    gotoPage(hn):void{      
        this.router.navigate(['manage','prescription_request',hn]);
    }
}
