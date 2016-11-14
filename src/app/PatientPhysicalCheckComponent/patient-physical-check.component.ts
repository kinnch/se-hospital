import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PhysicalCheckService } from '../../services/physical-check.service';
import * as moment_ from 'moment';

const HN_NO: string = "12344321";

@Component({
    selector: 'patient-physical-check-c',
    template: require('./patient-physical-check.component.html'),
    styles: [require('./patient-physical-check.component.css')]
})

export class PatientPhysicalCheckComponent implements OnInit {
    physicalData = [];
    systolic: number;
    diastolic: number;
    heartRate: number;
    weight: number;
    height: number;
    temp: number;
    HN: string = HN_NO;
    isAdd: boolean = false;
    buttonName: string = 'เพิ่ม';
    constructor(private router: Router, 
                private physicalCheckService: PhysicalCheckService
                ) { }
    ngOnInit(): void {
        this.physicalCheckService.getPhysicalCheckHistory(this.HN).then((physicalData)=>{
            let physicalArray = physicalData['physical_check'];
            console.log(">>",physicalData)            
            physicalArray.forEach((phy)=>{
                phy.date = moment_().format('l'); 
            })
            this.physicalData = physicalArray;
        });
    }
    addPhysicalCheck() {
        this.physicalCheckService.addPhysicalCheck(this.systolic, this.diastolic, this.heartRate, this.weight, this.height, this.temp, this.HN)
            .then((res) => {
                if (res == "success") {
                    this.isAdd = !this.isAdd;
                    if (this.isAdd) this.buttonName = 'แก้ไข'
                    else this.buttonName = 'บันทึก'
                }
            });
    }

}