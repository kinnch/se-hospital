import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params ,Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { DiagnosisService } from '../../services/diagnosis.service';
import { PhysicalCheckService} from '../../services/physical-check.service';
import {Subscription } from 'rxjs';
import * as moment_ from 'moment';
import { UserService } from '../../services/user.service';


@Component({
    selector: 'diagnosis-c',
    template: require('./diagnosis.component.html'),
    styles: [require('./diagnosis.component.css')]
})

export class DiagnosisComponent {
    HN: string;
    doctorID = localStorage.getItem('user_id');
    doctorDepartment = localStorage.getItem('department_id');
    todayPhysicalCheck: any;
    private subscription: Subscription;
    allDiagnosisHistory: JSON;
    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private appointmentService: AppointmentService,
        private diagnosisService: DiagnosisService,
        private physicalCheckService : PhysicalCheckService) { 
            router.events.subscribe((val) => {
                this.doctorID = localStorage.getItem('user_id');
            });
        }
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
                        // console.log('diagnosis history all');
                        // console.log(data);
                        
                        moment_.locale('th');

                        for(var i=0 ; i < data['diagnosisHistory'].length ; i++){
                            data['diagnosisHistory'][i]['date'] = moment_(data['diagnosisHistory'][i]['date']).format('ll');
                        }

                        // console.log('diagnosis -------');
                        // console.log(data);
                        this.allDiagnosisHistory = data['diagnosisHistory'];
                        this.physicalCheckService.getPhysicalCheckHistory(this.HN)
                        .then((data)=>{
                            console.log('physical check service');
                            // console.log(data);
                            if(data['status']!='fail' && data['physical_check'].length !=0){
                                this.todayPhysicalCheck = data['physical_check'][0];
                                console.log(this.todayPhysicalCheck);
                            }
                            
                        });
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

    addDiagnosis():void{
        this.router.navigate(['manage', 'diagnosis', 'add', this.HN]);
    }
    
    addApp(): void{
        this.router.navigate(['manage', 'create_appointment',this.HN,this.doctorID,this.doctorDepartment]);
    }
}