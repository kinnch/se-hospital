import {Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PrescriptionListElement } from '../../models/prescription-list-element';
import { PrescriptionTableComponent } from '../PrescriptionTableComponent/prescription-table.component';
import * as moment_ from 'moment';
@Component({
    selector: 'prescription-list-element-c',
    template: require('./prescription-list-element.component.html'),
    styles: [require('./prescription-list-element.component.css')]
})

export class PrescriptionListElementComponent{
    @Input() data ; //(0)หมอต้องแก้ Doctor needs to edit (1)หมอจ่ายมา Doctor prescipe, (2)เภสัชจ่ายแล้ว 
    year: number;
    month: number;
    constructor(private router: Router) {
    }

    gotoPage(hn):void{      
        this.router.navigate(['manage','prescription_request',hn]);
    }

    edit(obj):void{
        this.router.navigate(['manage','edit_prescription', obj]);
    }

     ngOnInit(): void {
        var diffDuration = moment_.duration(moment_().diff(this.data.patient.birthDate));
        this.year = diffDuration.years();
        this.month = diffDuration.months();
       
     }

}
