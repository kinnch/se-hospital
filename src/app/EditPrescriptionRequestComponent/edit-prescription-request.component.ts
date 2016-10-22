import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
@Component({
    selector: 'prescription-request-c',
    template: require('./edit-prescription-request.component.html'),
    styles: [require('./edit-prescription-request.component.css')]
})

export class EditPrescriptionRequestComponent{    
    constructor(private router: Router) {
    }

    gotoPage(hn):void{      
        this.router.navigate(['manage','prescription_request',hn]);
    }
}
