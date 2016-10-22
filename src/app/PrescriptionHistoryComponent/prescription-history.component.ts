import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
@Component({
    selector: 'prescription-history-c',
    template: require('./prescription-history.component.html')
    styles: [require('./prescription-history.component.css')]
})

export class PrescriptionHistoryComponent{    
    constructor(private router: Router) {
    }

    goBack():void{      
        window.history.back();
    }
}
