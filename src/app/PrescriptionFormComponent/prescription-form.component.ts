import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Prescription } from '../../models/prescription';
@Component({
    selector: 'prescription-form-c',
    template: require('./prescription-form.component.html'),
    styles: [require('./prescription-form.component.css')]
})

export class PrescriptionFormComponent{
    prescriptionList : Prescription[] = [];
    currentId: number =1;
    constructor(private router: Router) {
       this.addPrescriptionField();
    }
    addPrescriptionField() {
        this.prescriptionList.push({id:this.currentId ,drugName:"", amount:0, manual:""});
        this.currentId++;
        console.log(this.prescriptionList);
    }
    deletePrescriptionField(index) {
        console.log("delete");
        this.prescriptionList.splice(index, 1);
    }

     departments = [
        'แผนกอายุรกรรม',
        'แผนกศัลยกรรม',
        'แผนกสูติ-นรีเวช',
        'แผนกจักษุ',
        'แผนกโรคผิวหนัง',
        'แผนกอวัยวะปัสสาวะ',
        'แผนกหัวใจ',
        'แผนกหู คอ จมูก',
        'แผนกรังสี',
        'แผนกรักษาโรคในช่องปากและฟัน'
    ];

}
