import {Component, Input,ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { StaffCalendarComponent } from '../StaffCalendarComponent/staff-calendar.component';
import { CalendarContainerComponent } from '../CalendarContainerComponent/calendar-container.component';
import { DiagnosisService } from '../../services/diagnosis.service';
import { ToastComponent } from '../ToastComponent/toast.component';
import * as moment from 'moment';
@Component({
    selector: 'manage-doctor-calendar-c',
    template: require('./manage-doctor-calendar.component.html'),
    styles: [require('./manage-doctor-calendar.component.css')]
})

export class ManageDoctorCalendarComponent{
    @ViewChild( ToastComponent ) toast: ToastComponent;
    csvData = [];
    now = moment();
    successCount = 0;
    totalCount =0;
    readResult :any;
    this_month_str = this.now.format('MMMM').concat(' (เดือนนี้)');
    next_month_str = this.now.add(1, 'months').format('MMMM').concat(' (เดือนหน้า)');
    next_next_month_str = this.now.add(2, 'months').format('MMMM').concat(' (2 เดือนหน้า)');
    months = [
        this.this_month_str,
        this.next_month_str,
        this.next_next_month_str
         ]
    constructor(private router: Router,
    private diagnosisService : DiagnosisService) {
    }
    changeListener($event) : void {
        this.readThis($event.target);
    }

    readThis(inputValue: any) : void {
        var file:File = inputValue.files[0]; 
        var myReader:FileReader = new FileReader();
        var self = this;
        myReader.onloadend = function(e){
        // you can perform an action with readed data here
            self.readResult = myReader.result;
            // console.log(result);
            
        }

        myReader.readAsText(file);
    }
    toastResult(){
        var lines = this.readResult.split('\n');
            // console.log(lines);
            this.successCount = 0;
            this.totalCount = lines.length;
            for(var i=0;i<lines.length;i++){
                var arr = lines[i].split(',');
                var oneItem = {
                    "date": arr[0].trim().concat('T00:00:00.000Z'),
                    "timePeriod": arr[1].trim(),
                    "doctor_fname": arr[2].trim(),
                    "doctor_lname": arr[3].trim()
                }
                
                    this.diagnosisService.addSchedule(oneItem)
                    .then((data) => {
                        console.log('called');
                        console.log(data);
                        if(data['msg']=='saved'){
                            this.successCount++;
                        }
                    });
                
            }

        this.toast.titleSuccess = "เพิ่มสำเร็จ";
        this.toast.messageSuccess = "";
        this.toast.addToastSuccess();
    }
}
