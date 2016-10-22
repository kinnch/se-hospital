import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
@Component({
    selector: 'prescription-request-c',
    template: require('./prescription-request.component.html'),
    styles: [require('./prescription-request.component.css')],
})

export class PrescriptionRequestComponent{
    isReject : boolean = false;
    constructor(private router: Router) {
    }
}
