import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PrescriptionFormComponent } from '../PrescriptionFormComponent/prescription-form.component'

@Component({
    selector: 'edit-prescription-c',
    template: require('./edit-prescription.component.html'),
    styles: [require('./edit-prescription.component.css')]
})

export class EditPrescriptionComponent{    
    constructor(private router: Router) {
    }

    goBack():void{      
        window.history.back();
    }
}
