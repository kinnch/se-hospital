import {Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'staff-c',
    template: require('./staff.component.html'),
    styles: [require('./staff.component.css')]
})

export class StaffComponent {
    constructor(private router: Router) {
    }
}
