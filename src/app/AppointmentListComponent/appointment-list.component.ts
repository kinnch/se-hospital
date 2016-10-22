import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
@Component({
    selector: 'appointment-list-c',
    template: require('./appointment-list.component.html'),
    styles: [require('./appointment-list.component.css')]
})

export class AppointmentListComponent{
    constructor(private router: Router) {
    }
}
