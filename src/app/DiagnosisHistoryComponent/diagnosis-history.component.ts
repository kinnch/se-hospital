import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'diagnosis-history-c',
    template: require('./diagnosis-history.component.html'),
    styles: [require('./diagnosis-history.component.css')]
})

export class DiagnosisHistoryComponent {
    @Input() allDiagnosisHistory:JSON;
    constructor(private router: Router) {
    }

    gotoDetail(hn, date):void{
        this.router.navigate(['manage','diagnosis',hn,date]);
    }
}