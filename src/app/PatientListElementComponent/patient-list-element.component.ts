import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
@Component({
    selector: 'patient-list-element-c',
    template: require('./patient-list-element.component.html'),
    styles: [require('./patient-list-element.component.css')]
})

export class PatientListElementComponent{
    @Input() oneData;
    constructor(private router: Router) {
    }
}
