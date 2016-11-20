import {Component, Input, ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PrescriptionFormComponent } from '../PrescriptionFormComponent/prescription-form.component'
import {Subscription } from 'rxjs';
import {OnInit, OnDestroy} from '@angular/core';
import { PrescriptionService } from '../../services/prescription.service';
import { ToastComponent } from '../ToastComponent/toast.component';


@Component({
    selector: 'edit-prescription-c',
    template: require('./edit-prescription.component.html'),
    styles: [require('./edit-prescription.component.css')]
})

export class EditPrescriptionComponent{  
    presID: string;
    data: any;
    private subscription: Subscription;
    prescriptionToBeSave = [];
    newPres: string;
        @ViewChild( ToastComponent ) toast: ToastComponent;

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
     handle(receivedData){
        var parsed = JSON.parse(receivedData);

        var arr = [];

        for(var x in parsed){
        arr.push(parsed[x]);
        }
        console.log('handle');
        this.prescriptionToBeSave = arr;
     }
     confirm(){
         console.log('----Confirm----');
         console.log(this.prescriptionToBeSave);
         this.prescriptionService.prescriptionChange(this.presID, this.prescriptionToBeSave)
         .then((res) => {
               if (res.status == "success") {
                    this.toast.titleSuccess="ยืนยันการจ่ายยาสำเร็จ";
                    this.toast.messageSuccess="";
                    this.toast.addToastSuccess();
                    this.router.navigate(['manage','edit_prescription_request']);

                } else{
                    this.toast.addToastError();
                }
            });
     }
}
