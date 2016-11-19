import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PrescriptionFormComponent } from '../PrescriptionFormComponent/prescription-form.component'
import {Subscription } from 'rxjs';
import {OnInit, OnDestroy} from '@angular/core';
import { PrescriptionService } from '../../services/prescription.service';

@Component({
    selector: 'edit-prescription-c',
    template: require('./edit-prescription.component.html'),
    styles: [require('./edit-prescription.component.css')]
})

export class EditPrescriptionComponent{  
    presID: string;
    data: any;
    private subscription: Subscription;
  
    newPres: string;
    constructor(private router: Router,private prescriptionService: PrescriptionService, private activatedRoute: ActivatedRoute) {
    }

    goBack():void{      
        window.history.back();
    }

     ngOnInit() {
         this.newPres = 'xxx';
        // subscribe to router event
        this.subscription = this.activatedRoute.params.subscribe(
        (param: any) => {
            this.presID = param['pres'];
            
            this.prescriptionService.getPrescription(this.presID).then((data) => {
                this.data = data;
                console.log(this.data);
                console.log(this.data["prescriptions"])
            });

        });
     }

     confirm(){
         console.log('--------');
         console.log(this.newPres);
     }
}
