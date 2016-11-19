import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params ,Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import {Subscription } from 'rxjs';
import * as moment_ from 'moment';
@Component({
    selector: 'patient-detail-c',
    template: require('./patient-detail.component.html'),
    styles: [require('./patient-detail.component.css')]
})

export class PatientDetailComponent implements OnInit{
    HN: string;
    private subscription: Subscription;
    data: JSON;
    found: boolean;
    year: number;
    month: number;
    enablePhysicalDetail: boolean;
    enableDiagnosisDetail: boolean;
    constructor(private router: Router, private activatedRoute: ActivatedRoute, private appointmentService: AppointmentService) {}
    goback(): void{
        window.history.back();
    }
    ngOnInit(){
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.HN = param['hn'];
                console.log(this.HN);
                this.appointmentService.getPatientAndAppointment(this.HN)
                .then((data) => {
                    console.log(data);
                    this.data = data;
                    this.found = true;
                    var diffDuration = moment_.duration(moment_().diff(this.data['patient_data']['birthDate']));
                    this.year = diffDuration.years();
                    this.month = diffDuration.months();
                });
        });
        if(this.router.url.slice(0,22) == "/manage/physical_check"){
            this.enablePhysicalDetail = true;
            this.enableDiagnosisDetail = false;            
            
        } else if(this.router.url.slice(0,17) == "/manage/diagnosis"){
            this.enableDiagnosisDetail = true;
            this.enablePhysicalDetail = false;            
        }
        
        
    }
}