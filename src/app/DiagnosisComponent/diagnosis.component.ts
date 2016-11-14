import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'diagnosis-c',
    template: require('./diagnosis.component.html'),
    styles: [require('./diagnosis.component.css')]
})

export class DiagnosisComponent {
    constructor(private router: Router) { }
    phyCheckHistory(hn):void{      
        this.router.navigate(['manage','patient','check',hn]);
    }

    addDia(hn):void{
        this.router.navigate(['manage', 'diagnosis', 'add', hn]);
    }
    
}