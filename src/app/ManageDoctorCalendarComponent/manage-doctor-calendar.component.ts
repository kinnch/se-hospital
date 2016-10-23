import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { DoctorCalendarComponent } from '../DoctorCalendarComponent/doctor-calendar.component';
import { CalendarContainerComponent } from '../CalendarContainerComponent/calendar-container.component';
import * as moment from 'moment';
@Component({
    selector: 'manage-doctor-calendar-c',
    template: require('./manage-doctor-calendar.component.html'),
    styles: [require('./manage-doctor-calendar.component.css')]
})

export class ManageDoctorCalendarComponent{
    now = moment();
    this_month_str = this.now.format('MMMM').concat(' (เดือนนี้)');
    next_month_str = this.now.add(1, 'months').format('MMMM').concat(' (เดือนหน้า)');
    next_next_month_str = this.now.add(2, 'months').format('MMMM').concat(' (2 เดือนหน้า)');
    months = [
        this.this_month_str,
        this.next_month_str,
        this.next_next_month_str
         ]
    constructor(private router: Router) {
    }
}
