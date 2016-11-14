import {Component, Input, HostListener} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PatientListComponent } from '../PatientListComponent/patient-list.component';
import { PatientListElementComponent } from '../PatientListElementComponent/patient-list-element.component';
@Component({
    selector: 'manage-queue-c',
    template: require('./manage-queue.component.html'),
    styles: [require('./manage-queue.component.css')]
})

export class ManageQueueComponent{
    constructor(private router: Router) {
    }
    @HostListener('window:resize', ['$event'])
    contentHeight = window.innerHeight;
    navHeight = 59;
    onResize(event) {
        let height = event.target.innerHeight;
        this.contentHeight = height - this.navHeight;
    }
}
