import {Component, Input, HostListener} from '@angular/core';
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

export class ManageQueueComponent{ 
    roleID : number;
    departmentID : string;
    doctorList : any;
    scheduleList : any;
    constructor(private router: Router, private departmentService : DepartmentService, private appointmentService : AppointmentService ) {
        /*
                1 == hospitalStaff // muliple queue
                2 == doctor         // 1 queue
                3 == nurse          //merged queue
                4 == pharmacist 
            */
            
        this.roleID = Number(localStorage.getItem('user_roleID'));
        this.departmentID  = localStorage.getItem('department_id');
            var hours = new Date().getHours();
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
            this.departmentID = '';
            mid = 'pm';
            this.appointmentService.getTodayAppointments(this.departmentID,mid)
            .then((data) => {
                this.roleID = 3;
                if(this.roleID == 1){//staff
                    this.scheduleList  = data['scheduleList'];
                }
                else if(this.roleID == 2){//doctor
                    //make the doctor who is the user to the first doctor in array//BAD CODE but get things done.
                    this.scheduleList = [];
                    var onceTester = true;
                    for( var i = 0 ; i < data['scheduleList'].length ; i++){
                        // if(allSchedule[i]['doctor']['userName'] == localStorage.getItem('user_username')){
                            if(onceTester){
                                onceTester = false;
                            this.scheduleList.push(data['scheduleList'][i]);
                        }
                    }
                }
                else if(this.roleID == 3){//nurse
                    //Merge all appointment to the first doctor //BAD CODE but get things done.
                    /*
                    data = {
  "scheduleList": [
    {
      "_id": "582f115ed30866002c6f04e9",
      "timePeriod": "pm",
      "date": "2016-11-18T00:00:00.000Z",
      "doctor": {
        "_id": "582f115ed30866002c6f04da",
        "roleID": 2,
        "department": "582f115ed30866002c6f04c8",
        "userName": "doctoruser",
        "__v": 0,
        "name": {
          "title": "นพ.",
          "fname": "ผมคือหมอ",
          "lname": "หมอโดยกำเนิด"
        }
      },
      "__v": 0,
      "appointments": [
        {
          "_id": "582f115ed30866002c6f04de",
          "patient": {
            "_id": "582f115ed30866002c6f04d3",
            "email": "keerati.tan@gmail.com",
            "tel": "0888983283",
            "nationalID": "1103701553821",
            "sex": "male",
            "birthDate": "1994-11-16T00:00:00.000Z",
            "HN": "12344321",
            "bloodType": "A",
            "__v": 0,
            "allegicDrugs": [
              "582f115ed30866002c6f04b9"
            ],
            "OTP": {
              "text": "931278",
              "generatedDate": "2016-11-18T14:34:06.344Z"
            },
            "address": {
              "detail": "842 เสนาวิลล่า84 ถ.แฮบปี้แลนด์",
              "subDistrict": "คลองจั่น",
              "distict": "บางกะปิ",
              "province": "กรุงเทพฯ",
              "postCode": "10240"
            },
            "name": {
              "title": "นาย",
              "fname": "กีรติ",
              "lname": "ธนกิจเจริญพัฒน์"
            }
          },
          "reason": "ตัวร้อน ไข้สูง เจ็บคอ กลืนน้ำลายไม่ได้",
          "status": 0,
          "__v": 0
        },
        {
          "_id": "582f115ed30866002c6f04e0",
          "patient": {
            "_id": "582f115ed30866002c6f04d5",
            "email": "Krung_sri@hotmail.co.th",
            "tel": "0890891111",
            "nationalID": "1100100011231",
            "sex": "male",
            "birthDate": "1994-08-06T00:00:00.000Z",
            "HN": "100005",
            "bloodType": "AB",
            "__v": 0,
            "allegicDrugs": [
              "582f115ed30866002c6f04b9",
              "582f115ed30866002c6f04ba",
              "582f115ed30866002c6f04bb"
            ],
            "OTP": {
              "text": "111112",
              "generatedDate": "2016-11-18T14:34:06.348Z"
            },
            "address": {
              "detail": "622/100 ม.พฤกษ์ภิรมย์",
              "subDistrict": "คลองต้นไทร",
              "distict": "คลองสาน",
              "province": "กทม.",
              "postCode": "10600"
            },
            "name": {
              "title": "นาย",
              "fname": "กรุงศรี",
              "lname": "คนที่สอง"
            }
          },
          "reason": "หายใจไม่ออก",
          "status": 0,
          "__v": 0
        }
      ]
    },
    {
      "_id": "582f115ed30866002c6f04e9",
      "timePeriod": "pm",
      "date": "2016-11-18T00:00:00.000Z",
      "doctor": {
        "_id": "582f115ed30866002c6f04da",
        "roleID": 2,
        "department": "582f115ed30866002c6f04c8",
        "userName": "doctoruser",
        "__v": 0,
        "name": {
          "title": "นพ.",
          "fname": "ผมคือหมอ",
          "lname": "หมอโดยกำเนิด"
        }
      },
      "__v": 0,
      "appointments": [
        {
          "_id": "582f115ed30866002c6f04de",
          "patient": {
            "_id": "582f115ed30866002c6f04d3",
            "email": "keerati.tan@gmail.com",
            "tel": "0888983283",
            "nationalID": "1103701553821",
            "sex": "male",
            "birthDate": "1994-11-16T00:00:00.000Z",
            "HN": "12344321",
            "bloodType": "A",
            "__v": 0,
            "allegicDrugs": [
              "582f115ed30866002c6f04b9"
            ],
            "OTP": {
              "text": "931278",
              "generatedDate": "2016-11-18T14:34:06.344Z"
            },
            "address": {
              "detail": "842 เสนาวิลล่า84 ถ.แฮบปี้แลนด์",
              "subDistrict": "คลองจั่น",
              "distict": "บางกะปิ",
              "province": "กรุงเทพฯ",
              "postCode": "10240"
            },
            "name": {
              "title": "นาย",
              "fname": "กีรติ",
              "lname": "ธนกิจเจริญพัฒน์"
            }
          },
          "reason": "ตัวร้อน ไข้สูง เจ็บคอ กลืนน้ำลายไม่ได้",
          "status": 0,
          "__v": 0
        },
        {
          "_id": "582f115ed30866002c6f04e0",
          "patient": {
            "_id": "582f115ed30866002c6f04d5",
            "email": "Krung_sri@hotmail.co.th",
            "tel": "0890891111",
            "nationalID": "1100100011231",
            "sex": "male",
            "birthDate": "1994-08-06T00:00:00.000Z",
            "HN": "100005",
            "bloodType": "AB",
            "__v": 0,
            "allegicDrugs": [
              "582f115ed30866002c6f04b9",
              "582f115ed30866002c6f04ba",
              "582f115ed30866002c6f04bb"
            ],
            "OTP": {
              "text": "111112",
              "generatedDate": "2016-11-18T14:34:06.348Z"
            },
            "address": {
              "detail": "622/100 ม.พฤกษ์ภิรมย์",
              "subDistrict": "คลองต้นไทร",
              "distict": "คลองสาน",
              "province": "กทม.",
              "postCode": "10600"
            },
            "name": {
              "title": "นาย",
              "fname": "กรุงศรี",
              "lname": "คนที่สอง"
            }
          },
          "reason": "หายใจไม่ออก",
          "status": 0,
          "__v": 0
        }
      ]
    }
  ]
};
*/
                    this.scheduleList = [];
                    this.scheduleList.push(data['scheduleList'][0]);
                    for( var i = 1 ; i < data['scheduleList'].length ; i++){
                            for ( var j = 0 ; j < data['scheduleList'][i]['appointments'].length ; j++){
                                this.scheduleList[0]['appointments'].push(data['scheduleList'][i]['appointments'][j]);
                            }
                    }
                    console.log(this.scheduleList);
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
