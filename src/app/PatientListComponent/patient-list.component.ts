import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
@Component({
    selector: 'patient-list-c',
    template: require('./patient-list.component.html'),
    styles: [require('./patient-list.component.css')]
})

export class PatientListComponent{
    constructor(private router: Router) {
    }
    goto(hn):void{
        this.router.navigate(['manage','patient',hn]);
    }
}