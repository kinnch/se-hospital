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
            var result = myReader.result;
            // console.log(result);
            var lines = result.split('\n');
            // console.log(lines);
            self.successCount = 0;
            self.totalCount = lines.length;
            for(var i=0;i<lines.length;i++){
                var arr = lines[i].split(',');
                var oneItem = {
                    "date": arr[0].trim().concat('T00:00:00.000Z'),
                    "timePeriod": arr[1].trim(),
                    "doctor_fname": arr[2].trim(),
                    "doctor_lname": arr[3].trim()
                }
                
                    self.diagnosisService.addSchedule(oneItem)
                    .then((data) => {
                        console.log('called');
                        console.log(data);
                        if(data['msg']=='saved'){
                            self.successCount++;
                        }
                    });
                
            }
        }

        myReader.readAsText(file);
    }
    toastResult(){
        this.toast.titleSuccess = "เพิ่มสำเร็จ: "+this.successCount+"/"+this.totalCount;
        this.toast.messageSuccess = "";
        this.toast.addToastSuccess();
    }
}
