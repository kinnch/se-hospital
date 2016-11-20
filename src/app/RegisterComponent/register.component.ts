import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { PrescriptionService } from '../../services/prescription.service';

@Component({
    selector: 'register-c',
    template: require('./register.component.html'),
    styles: [require('./register.component.css')]
})

export class RegisterComponent implements OnInit{
    title: string;
    firstName: string;
    lastName: string;
    nationalID: string;
    address: string;
    province: string;
    district: string;
    subdistrict: string;
    postCode: string;
    tel: string;
    email: string;
    sex: string;
    birthDate: string;
    bloodType: string;

    drugs: any; 
    currentDrugId: number = 1;
    allegicDrugsList : any[] = [];
    allegicDrugs: string[] = [];

    constructor(private router: Router, 
                private location: Location,
                private patientService: PatientService, 
                private prescriptionService: PrescriptionService
                ) {}
    
    ngOnInit() {
        this.prescriptionService.getAllDrugs()
            .then((res) => {
                this.drugs = res['msg'];
                // console.log(this.drugs);
        });
    }
    addAllegicDrugField() {
        // this.myform = 'hello';
        this.allegicDrugsList.push({id:this.currentDrugId, drugID:""});
        this.currentDrugId++;
        // console.log(this.allegicDrugsList);
    }
    deleteAllegicDrugField(index) {
        // console.log("delete");
        this.allegicDrugsList.splice(index, 1);
    }
    bindsBack(selectedValue,i){
        // console.log('myFormChange');
		this.allegicDrugsList[i].drugID = selectedValue;
        // console.log(this.allegicDrugsList[i]);
    }


    goBack(): void {
        this.location.back();
    }
    register(): void {
        for(let drug of this.allegicDrugsList) {
            if(drug['drugID'])
                this.allegicDrugs.push(drug['drugID']);
        }
        this.patientService.createPatient(this.email, this.title, this.firstName, this.lastName, this.sex, this.birthDate, this.tel, this.nationalID, this.address, this.subdistrict, this.district, this.province, this.postCode, this.allegicDrugs, this.bloodType)
        .then((res)=>{
            if(res == "success") {
                console.log("register success!")
            } else {
                console.log("register fail!")
            }
        });
    }
}
