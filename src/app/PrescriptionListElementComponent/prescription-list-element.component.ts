import {Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PrescriptionListElement } from '../../models/prescription-list-element';
import { PrescriptionTableComponent } from '../PrescriptionTableComponent/prescription-table.component';
@Component({
    selector: 'prescription-list-element-c',
    template: require('./prescription-list-element.component.html'),
    styles: [require('./prescription-list-element.component.css')]
})

export class PrescriptionListElementComponent{
    @Input() data : PrescriptionListElement ; //(0)หมอต้องแก้ Doctor needs to edit (1)หมอจ่ายมา Doctor prescipe, (2)เภสัชจ่ายแล้ว 
    constructor(private router: Router) {
    }
}
