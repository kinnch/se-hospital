import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
@Component({
    selector: 'schedule-manage',
    template: require('./schedule-manage.component.html'),
    styles: [require('./schedule-manage.component.css')]
})

export class ScheduleManageComponent{
    constructor(private router: Router) {
    }
}
