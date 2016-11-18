import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PrescriptionService } from '../../services/prescription.service';
//import { PrescriptionListElement } from '../../models/prescription-list-element';

@Component({
    selector: 'edit-prescription-request-c',
    template: require('./edit-prescription-request.component.html'),
    styles: [require('./edit-prescription-request.component.css')]
})

export class EditPrescriptionRequestComponent{    
    role: string = 'doctor';
    data: any;
    doctorID: string = '582f2c2b56e1af4108ec3639';

    constructor(private router: Router, private prescriptionService: PrescriptionService) {
    }

    ngOnInit() {
         this.prescriptionService.getPrescriptionChangeRequest(this.doctorID)
        .then((rejectedData)=>{
            this.data = rejectedData;
        });
    }

    gotoPage(hn):void{      
        this.router.navigate(['manage','prescription_request',hn]);
    }
}