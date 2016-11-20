import { Component } from '@angular/core';
import { ActivatedRoute, Params ,Router } from '@angular/router';
import { DiagnosisService } from '../../services/diagnosis.service';
import {Subscription } from 'rxjs';
import * as moment_ from 'moment';
@Component({
    selector: 'diagnosis-detail-c',
    template: require('./diagnosis-detail.component.html'),
    styles: [require('./diagnosis-detail.component.css')]
})

export class DiagnosisDetailComponent {
    diagnosisID: string;
    detail : string;
    prescriptionList : any;
    disease : any;
    physicalCheck : any;
    date : string;
    private subscription: Subscription;
    constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private diagnosisService: DiagnosisService) { }
    ngOnInit(){
        moment_.locale('th');
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.diagnosisID = param['diagID'];
                // console.log(this.HN);
                this.diagnosisService.getDiagnosisAndPhysicalCheck(this.diagnosisID)
                .then((data)=>{
                    // console.log('all diag N physical');
                    // console.log(data);
                    this.detail = data['diagnosis']['detail'];
                    this.disease = data['diagnosis']['disease']; 
                    this.prescriptionList = data['diagnosis']['drugPrescription']['prescriptions'];
                    this.physicalCheck = data['physical'];
                    var thaiPeriod = '';
                    
                    this.date = moment_(data['diagnosis']['date']).format('ll');
                    // console.log('physical check data');
                    // console.log(this.physicalCheck);
                });
        });
    }
    goback(): void {
        window.history.back();
    }
}