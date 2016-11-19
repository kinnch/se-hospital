import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params ,Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { DiagnosisService } from '../../services/diagnosis.service';
import {Subscription } from 'rxjs';
@Component({
    selector: 'diagnosis-c',
    template: require('./diagnosis.component.html'),
    styles: [require('./diagnosis.component.css')]
})

export class DiagnosisComponent {
    HN: string;
    private subscription: Subscription;
    allDiagnosisHistory: JSON;
    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private appointmentService: AppointmentService,
        private diagnosisService: DiagnosisService) { }
    ngOnInit(){
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.HN = param['hn'];
                // console.log(this.HN);
                this.appointmentService.getPatientAndAppointment(this.HN)
                .then((data) => {
                    var patient_id = data['patient_data']['_id'];
                    // console.log(patient_id);
                    this.diagnosisService.getAllDiagnosisHistory(patient_id)
                    .then((data) =>{
                        console.log('diagnosis history all');
                        console.log(data);
                        this.allDiagnosisHistory = data['diagnosisHistory'];
                    });
                    // this.found = true;
                    // var diffDuration = moment_.duration(moment_().diff(this.data['patient_data']['birthDate']));
                    // this.year = diffDuration.years();
                    // this.month = diffDuration.months();
                });
        });
    }
    phyCheckHistory(hn):void{      
        this.router.navigate(['manage','patient','check',hn]);
    }

    addDia(hn):void{
        this.router.navigate(['manage', 'diagnosis', 'add', hn]);
    }
    
    addApp(hn, doctor_id, department_id): void{
        this.router.navigate(['manage', 'create_appointment',hn,doctor_id,department_id]);
    }
}