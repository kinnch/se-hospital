import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PhysicalCheckService } from '../../services/physical-check.service';
import * as moment_ from 'moment';
import { ToastComponent } from '../ToastComponent/toast.component';
import {Subscription } from 'rxjs';

@Component({
    selector: 'patient-physical-check-c',
    template: require('./patient-physical-check.component.html'),
    styles: [require('./patient-physical-check.component.css')]
})

export class PatientPhysicalCheckComponent implements OnInit {
    @ViewChild(ToastComponent) toast: ToastComponent;
    physicalData = [];
    systolic: number;
    diastolic: number;
    heartRate: number;
    weight: number;
    height: number;
    temp: number;
    HN: string;
    isAdd: boolean = false;
    buttonName: string = 'เพิ่ม';
    private subscription: Subscription;
    constructor(private router: Router, 
                private physicalCheckService: PhysicalCheckService,
                private activatedRoute: ActivatedRoute,
                ) { }
    ngOnInit(): void {
        moment_.locale('th');
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.HN = param['hn'];
                console.log(this.HN);
         });
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
                    this.toast.addToastSuccess();
                }
                else{
                    this.toast.addToastError();                    
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
                    this.toast.addToastSuccess();    
                }
                else{
                    this.toast.addToastError();
                }
            });
        }


    }

}