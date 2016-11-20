import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PatientService } from '../../services/patient.service';

@Component({
    selector: 'register-c',
    template: require('./register.component.html'),
    styles: [require('./register.component.css')]
})

export class RegisterComponent{
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
    allegicDrugs: string;
    bloodType: string;
    constructor(private router: Router, 
                private location: Location,
                private patientService: PatientService
                ) {}
    goBack(): void {
        this.location.back();
    }
    register(): void {
        this.birthDate;
        this.allegicDrugs;
        this.patientService.createPatient(this.email, this.title, this.firstName, this.lastName, this.sex, this.birthDate, this.tel, this.nationalID, this.address, this.subdistrict, this.district, this.province, this.postCode, this.allegicDrugs, this.bloodType)
        .then((res)=>{
            if(res == "success") {

            } else {

            }
        });
    }
}
