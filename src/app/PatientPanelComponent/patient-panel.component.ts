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
    }
}
