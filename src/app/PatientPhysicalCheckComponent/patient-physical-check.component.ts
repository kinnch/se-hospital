import {Component,Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PhysicalCheckService } from '../../services/physical-check.service';

const HN_NO:string = "12344321";

@Component({
    selector: 'patient-physical-check-c',
    template: require('./patient-physical-check.component.html'),
    styles: [require('./patient-physical-check.component.css')]
})

export class PatientPhysicalCheckComponent {
    systolic:number;
    diastolic:number;
    heartRate:number;
    weight:number;
    height:number;
    temp:number;
    hn:string = HN_NO;
    constructor(private router: Router, private physicalCheckService: PhysicalCheckService) {}
    addPhysicalCheck(){
        this.physicalCheckService.addPhysicalCheck(this.systolic,this.diastolic,this.heartRate,this.weight,this.height,this.temp,this.hn)
        .then((res) => {
            console.log('>>>>',res);
        });
    }
}