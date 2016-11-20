import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

import { PatientService } from '../../services/patient.service';
import * as moment_ from 'moment';

@Component({
    selector: 'patient-panel-c',
    template: require('./patient-panel.component.html'),
    styles: [require('./patient-panel.component.css')]
})

export class PatientPanelComponent{
    constructor(private router: Router,
                private PatientService:PatientService) {
    }

    ngOnInit():void{
        moment_.locale('th');
        console.log(localStorage.getItem('patient_id'));

          console.log(localStorage.getItem('patient_title'));
          console.log(localStorage.getItem('patient_fname'));
          console.log(localStorage.getItem('patient_lname'));

          console.log(localStorage.getItem('patient_email'));
          console.log(localStorage.getItem('patient_tel'));
          console.log(localStorage.getItem('patient_nationalID'));
          console.log(localStorage.getItem('patient_birthDate'));
          console.log(localStorage.getItem('patient_HN'));

          console.log(localStorage.getItem('patient_bloodType'));

          console.log(localStorage.getItem('patient_address_detail'));
          console.log(localStorage.getItem('patient_address_subDistrict'));
          console.log(localStorage.getItem('patient_address_distict'));
          console.log(localStorage.getItem('patient_address_province'));
          console.log(localStorage.getItem('patient_address_postCode'));

          console.log(localStorage.getItem('patient_sex'));
    }
}
