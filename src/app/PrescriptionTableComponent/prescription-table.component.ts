import {Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { PrescriptionListElement } from '../../models/prescription-list-element';
@Component({
    selector: 'prescription-table-c',
    template: require('./prescription-table.component.html'),
    styles: [require('./prescription-table.component.css')]
})

export class PrescriptionTableComponent{
    @Input() prescriptionList;
    constructor(private router: Router) {
    }
}
