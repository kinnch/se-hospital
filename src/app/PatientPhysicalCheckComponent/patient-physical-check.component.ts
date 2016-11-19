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
        moment_.locale('th');
        this.physicalCheckService.getPhysicalCheckHistory(this.HN).then((physicalData)=>{
            let physicalArray = [];
            console.log(">>",physicalData)            
            physicalData['physical_check'].forEach((phy)=>{             
                if(moment_(phy.date).format('ll') == moment_().format('ll')){
                    this.systolic = phy.bloodPresure.systolic;
                    this.diastolic = phy.bloodPresure.diastolic;
                    this.heartRate = phy.heartRate;
                    this.weight = phy.weight;
                    this.height = phy.height;
                    this.temp = phy.temp;
                    this.isAdd = true;
                    this.buttonName = "แก้ไข"
                }
                else{
                    phy.date = moment_(phy.date).format('ll'); 
                    physicalArray.push(phy);
                }
            })
            this.physicalData = physicalArray
        });
    }
    addPhysicalCheck() {
        if(this.buttonName === "เพิ่ม"){
            this.physicalCheckService.addPhysicalCheck(this.systolic, this.diastolic, this.heartRate, this.weight, this.height, this.temp, this.HN)
            .then((res) => {
                if (res == "success") {
                    this.isAdd = !this.isAdd;
                    this.buttonName = 'แก้ไข'
                }
            });
        }
        else if(this.buttonName === "แก้ไข"){
            this.isAdd = !this.isAdd;
            this.buttonName = "บันทึก"
        }
        else if(this.buttonName === "บันทึก"){
            this.physicalCheckService.editPhysicakCheck(this.systolic, this.diastolic, this.heartRate, this.weight, this.height, this.temp, this.HN)
            .then((res) => {
                if (res == "success") {
                    this.isAdd = !this.isAdd;
                    this.buttonName = 'แก้ไข'
                }
            });
        }


    }

}