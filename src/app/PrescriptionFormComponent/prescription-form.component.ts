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
    @Output() myformChange : EventEmitter<string> = new EventEmitter<string>();//: EventEmitter<JSON> = new EventEmitter<JSON>();// = new EventEmitter();
        drugs: any;

    prescriptionList : Prescription[] = [];
    currentId: number =1;
    constructor(private router: Router, private prescriptionService: PrescriptionService) {
    }

    ngOnInit() {
        this.prescriptionService.getAllDrugs()
            .then((res) => {
               this.drugs = res.msg;
        });

        var ok =true;
        try {
           this.data['prescriptions']; 
        } catch (error) {
            ok = false;
        }
        if(ok){
            this.data['prescriptions'].forEach((d)=>{
            this.prescriptionList.push({id: this.currentId, drug: d.drug._id, amount: d.amount, detail: d.detail });
            this.currentId++;
            })
        }
        
        // this.newPres = this.prescriptionList;
    }
    ngAfterViewInit(){
        
    }
    bindsBack(newValue,i,mode){
        console.log('myFormChange');
        if(mode == 1 ){//drugID
            this.prescriptionList[i]['drug'] = newValue;
        }
        else if(mode == 2){//amount
            this.prescriptionList[i]['amount'] = newValue;
        }
        else if (mode == 3){//detail
            this.prescriptionList[i]['detail'] = newValue;
        }
        console.log(this.prescriptionList);
        this.myformChange.emit(JSON.stringify(this.prescriptionList));
    }
    addPrescriptionField() {
        this.myform = 'hello';
        this.prescriptionList.push({id:this.currentId, drug:"" , amount:0, detail:""});
        this.currentId++;
        console.log('add');
        console.log(this.prescriptionList);
    }
    deletePrescriptionField(index) {
        console.log("delete");
        this.prescriptionList.splice(index, 1);
    }

}
