import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { DoctorCalendarComponent } from '../DoctorCalendarComponent/doctor-calendar.component';
@Component({
    selector: 'calendar-container-c',
    template: require('./calendar-container.component.html'),
    styles: [require('./calendar-container.component.css')]
})

export class CalendarContainerComponent{
    constructor(private router: Router) {
    }
}
