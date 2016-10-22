import {Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'staff-c',
    template: `<h1>staff</h1>`
})

export class StaffComponent {
    constructor(private router: Router) {
    }
}
