import {Component,EventEmitter, Input, Output, OnInit, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Prescription } from '../../models/prescription';
import { PrescriptionService } from '../../services/prescription.service';

@Component({
    selector: 'prescription-form-c',
    template: require('./prescription-form.component.html'),
    styles: [require('./prescription-form.component.css')]
})

export class PrescriptionFormComponent implements OnInit{
    @Input() data;
    @Input() myform : string;
    @Output() myformChange = new EventEmitter<string>();
        drugs: any;

    prescriptionList : Prescription[] = [];
    currentId: number =1;
    constructor(private router: Router, private prescriptionService: PrescriptionService) {
    }

    ngOnInit() {
        this.prescriptionService.getAllDrugs()
            .then((res) => {
               this.drugs = res.msg;
               console.log('--------------------');
               console.log(this.drugs);
        });

        console.log('=========');
        console.log(this.data);
        //this.newPres = [];
        
        this.data['prescriptions'].forEach((d)=>{
            this.prescriptionList.push({id: this.currentId, drugName: d.drug.name, amount: d.amount, detail: d.detail });
            //this.newPres.push({id: this.currentId, drugName: d.drug.name, amount: d.amount, detail: d.detail });
            this.currentId++;
            
        })
        // this.newPres = this.prescriptionList;
    }
    ngAfterViewInit(){
        
    }

    addPrescriptionField() {
        this.myform = 'hello';
        this.prescriptionList.push({id:this.currentId, drugName:"", amount:0, detail:""});
        this.currentId++;
        console.log('add');
        console.log(this.prescriptionList);
    }
    deletePrescriptionField(index) {
        console.log("delete");
        this.prescriptionList.splice(index, 1);
    }

}
