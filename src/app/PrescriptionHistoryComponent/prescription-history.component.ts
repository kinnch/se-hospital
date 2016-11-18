import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PrescriptionService } from '../../services/prescription.service';
import {Subscription } from 'rxjs';
import {OnInit, OnDestroy} from '@angular/core';

@Component({
    selector: 'prescription-history-c',
    template: require('./prescription-history.component.html'),
    styles: [require('./prescription-history.component.css')]
})

export class PrescriptionHistoryComponent{
    data;
    dataPack = [];
    HN = '12344321';
    private subscription: Subscription;

    constructor(private router: Router,private activatedRoute: ActivatedRoute, private prescriptionService: PrescriptionService) {
        this.prescriptionService.getPrescriptionHistory(this.HN)
        .then((data) => {
            // this.data = data['history'];
            var i;
            var j;
            var preDate;
            for(i=0;i<data['history'].length;i++){
                preDate = data['history'][0]['date'];
                for(j=0;j<data['history'][i]['drugPrescription']['prescription'].length;j++){
                    if(j==0){
                        data['history'][i]['drugPrescription']['prescription'][j]['head']=true;
                        data['history'][i]['drugPrescription']['prescription'][j]['date']=preDate;
                    }
                    else{
                        data['history'][i]['drugPrescription']['prescription'][j]['head']=false;
                    }
                        this.dataPack.push(data['history'][i]['drugPrescription']['prescription'][j]);
                }
            }
             console.log(this.dataPack);
        });
    }

    ngOnInit() {
    // subscribe to router event
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => {
        let userId = param['hn'];
        console.log("hn -->>>>>>>"+userId);
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
