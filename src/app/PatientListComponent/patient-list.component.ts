import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';
@Component({
    selector: 'patient-list-c',
    template: require('./patient-list.component.html'),
    styles: [require('./patient-list.component.css')]
})

export class PatientListComponent{
    department: string = '1';
    constructor(private router: Router ,private patientService: PatientService) {
    }
    goto(hn):void{
        this.router.navigate(['manage','patient',hn]);
    }
    dataAllPatientToday;
    getPatientTodayState(){
        this.patientService.getPatientTodayState(this.department)
        .then((data) => {
            console.log('then');
            console.log(data);
            this.dataAllPatientToday = data;
        });
    }
}