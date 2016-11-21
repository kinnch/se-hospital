import {Component, Input, HostListener, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PatientListComponent } from '../PatientListComponent/patient-list.component';
import { PatientListElementComponent } from '../PatientListElementComponent/patient-list-element.component';
import { DepartmentService } from '../../services/department.service';
import { AppointmentService } from '../../services/appointment.service';
@Component({
    selector: 'manage-queue-c',
    template: require('./manage-queue.component.html'),
    styles: [require('./manage-queue.component.css')]
})

export class ManageQueueComponent implements OnInit{ 
    roleID : number;
    departmentID : string;
    doctorList : any;
    scheduleList : any;
    isEmpty = false;
    constructor(private router: Router, private departmentService : DepartmentService, private appointmentService : AppointmentService ) {
                    
    }
    ngOnInit() {
      /*
                1 == hospitalStaff // muliple queue
                2 == doctor         // 1 queue
                3 == nurse          //merged queue
                4 == pharmacist 
            */
            
        this.roleID = Number(localStorage.getItem('user_roleID'));
        this.departmentID  = localStorage.getItem('department_id');
            var hours = new Date().getHours();
            console.log('hours');
            console.log(hours);
            var hours = (hours+24-2)%24; 
            var mid='am';
            if(hours==0){ //At 00 hours we need to show 12 am
                hours=12;
            }
            else if(hours>12){
                hours=hours%12;
                mid='pm';
            }
            
            //Retrive all appointment in queue (now)
            // this.departmentID = '';//TODO : remove this tester
            // mid = 'am';
            this.appointmentService.getTodayAppointments(this.departmentID,mid)
            .then((data) => {
                // this.roleID = 3; //TODO : remove this tester
                if(this.roleID == 1){//staff
                    this.scheduleList  = data['scheduleList'];
                    if(data['scheduleList'] == [] || data['scheduleList']==null || data['scheduleList'].length == 0){
                      this.isEmpty = true;
                      console.log("this.scheduleList");
                    }
                    
                }
                else if(this.roleID == 2){//doctor
                    //make the doctor who is the user to the first doctor in array//BAD CODE but get things done.
                    if(data['scheduleList'] == [] || data['scheduleList']==null || data['scheduleList'].length == 0){
                      this.isEmpty = true;
                      console.log("this.scheduleList");
                    }
                    else{
                      this.isEmpty = true;
                      this.scheduleList = [];
                      var onceTester = true;
                      console.log('else');
                      for( var i = 0 ; i < data['scheduleList'].length ; i++){
                          if(data['scheduleList'][i]['doctor']['userName'] == localStorage.getItem('user_username')){
                              // if(onceTester){
                                  // onceTester = false;
                              this.scheduleList.push(data['scheduleList'][i]);
                              console.log("this.scheduleList");
                              console.log(this.scheduleList);
                              this.isEmpty = false;
                          }
                      }
                    }
                    
                }
                else if(this.roleID == 3){//nurse
                    //Merge all appointment to the first doctor //BAD CODE but get things done.
                    if(data['scheduleList'] == [] || data['scheduleList']==null || data['scheduleList'].length == 0){
                      this.isEmpty = true;
                      console.log("this.scheduleList");
                    }
                    else{
                      this.scheduleList = [];                  
                      this.scheduleList.push(data['scheduleList'][0]);
                      if(data['scheduleList'][0]['appointments'].length == 0|| data['scheduleList'][0]['appointments'] == null){
                        data['scheduleList'][0]['appointments'] = [];
                      }
                      for( var i = 1 ; i < data['scheduleList'].length ; i++){
                              for ( var j = 0 ; j < data['scheduleList'][i]['appointments'].length ; j++){
                                  this.scheduleList[0]['appointments'].push(data['scheduleList'][i]['appointments'][j]);
                              }
                      }
                      console.log(this.scheduleList);
                    }
                    
                }
            });
    }
    // @HostListener('window:resize', ['$event'])
    // contentHeight = window.innerHeight;
    // navHeight = 59;
    // onResize(event) {
    //     let height = event.target.innerHeight;
    //     this.contentHeight = height - this.navHeight;
    // }
}
