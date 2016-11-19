import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PrescriptionService } from '../../services/prescription.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'edit-prescription-request-c',
    template: require('./edit-prescription-request.component.html'),
    styles: [require('./edit-prescription-request.component.css')]
})

export class EditPrescriptionRequestComponent{    
    role: string = 'doctor';
    data: any;
    doctorID = localStorage.getItem('user_id');

    constructor(private router: Router, private prescriptionService: PrescriptionService) {
        router.events.subscribe((val) => {
            this.doctorID = localStorage.getItem('user_id');
        });
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