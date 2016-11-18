import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PrescriptionService } from '../../services/prescription.service';
import {Subscription } from 'rxjs';
import {OnInit, OnDestroy} from '@angular/core';
import * as moment_ from 'moment';


@Component({
    selector: 'prescription-history-c',
    template: require('./prescription-history.component.html'),
    styles: [require('./prescription-history.component.css')]
})

export class PrescriptionHistoryComponent{
    dataPack = [];
    HN: string;
    private subscription: Subscription;

    constructor(private router: Router,private activatedRoute: ActivatedRoute, private prescriptionService: PrescriptionService) {
    }

    ngOnInit() {
    // subscribe to router event
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        this.HN = param['hn'];
        console.log(this.HN);
      });
    
    moment_.locale('th');

    this.prescriptionService.getPrescriptionHistory(this.HN)
        .then((data) => {
            var i, j, date;
            for(i = 0 ; i < data.length ; i++){
                if(data[i].drugPrescription.status == 2){
                   date = moment_(data[i]['date']).format('ll'); 
                   for(j  = 0 ; j < data[i].drugPrescription.prescriptions.length; j++){
                       if(j == 0){
                           data[i]['drugPrescription']['prescriptions'][j]['head'] = true;
                           data[i]['drugPrescription']['prescriptions'][j]['date'] = date;
                           data[i]['drugPrescription']['prescriptions'][j]['no'] = data[i].drugPrescription.prescriptions.length;
                       }
                       else{
                           data[i]['drugPrescription']['prescriptions'][j]['head'] = false;
                       }
                       this.dataPack.push(data[i]['drugPrescription']['prescriptions'][j]);
                   }
                }
            }
        });
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }
    

    goBack():void{      
        window.history.back();
    }
}
