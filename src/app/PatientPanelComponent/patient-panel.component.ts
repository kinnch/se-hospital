import {Component, Input, onInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

import { PatientService } from '../../services/patient.service';
import * as moment_ from 'moment';

@Component({
    selector: 'patient-panel-c',
    template: require('./patient-panel.component.html'),
    styles: [require('./patient-panel.component.css')]
})

export class PatientPanelComponent implements OnInit {
	patient_id: string;
	patient_title: string;
	patient_fname: string;
	patient_lname: string;
	department_id: string;
	patient_email: string;
	patient_tel: string;
	patient_nationalID: string;
	patient_birthDate: string;
	patient_HN: string;
	patient_bloodType: string;
	patient_address: string;
	patient_sex: string;

    constructor(private router: Router,
                private PatientService:PatientService) {
    }

    ngOnInit():void{
        moment_.locale('th');

		patient_id = localStorage.getItem('patient_id');
		patient_title = localStorage.getItem('patient_title');
		patient_fname = localStorage.getItem('patient_fname');
		patient_lname = localStorage.getItem('patient_lname');
		department_id = localStorage.getItem('department_id');
		patient_email = localStorage.getItem('patient_email');
		patient_tel = localStorage.getItem('patient_tel');
		patient_nationalID = localStorage.getItem('patient_nationalID');
		patient_birthDate = localStorage.getItem('patient_birthDate');
		patient_HN = localStorage.getItem('patient_HN');
		patient_bloodType = localStorage.getItem('patient_bloodType');
		patient_address = localStorage.getItem('patient_address');
		patient_sex = localStorage.getItem('patient_sex');

console.log(localStorage.getItem('patient_id'));
console.log(localStorage.getItem('patient_title'));
console.log(localStorage.getItem('patient_fname'));
console.log(localStorage.getItem('patient_lname'));
console.log(localStorage.getItem('department_id'));
console.log(localStorage.getItem('patient_email'));
console.log(localStorage.getItem('patient_tel'));
console.log(localStorage.getItem('patient_nationalID'));
console.log(localStorage.getItem('patient_birthDate'));
console.log(localStorage.getItem('patient_HN'));
console.log(localStorage.getItem('patient_bloodType'));
console.log(localStorage.getItem('patient_address'));
console.log(localStorage.getItem('patient_sex'));


   }
}
