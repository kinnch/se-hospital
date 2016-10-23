import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PrescriptionService } from '../../services/prescription.service';
@Component({
    selector: 'prescription-history-c',
    template: require('./prescription-history.component.html'),
    styles: [require('./prescription-history.component.css')]
})

export class PrescriptionHistoryComponent{
    data;
    dataPack = [];
    HN = '12344321';
    constructor(private router: Router, private prescriptionService: PrescriptionService) {
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
    

    goBack():void{      
        window.history.back();
    }
}
