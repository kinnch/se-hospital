import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
// departments: string[] = [];

@Component({
    selector: 'make-appointment-c',
    template: require('./make-appointment.component.html'),
    styles: [require('./make-appointment.component.css')]
})

export class MakeAppointComponent{
    departments = [
        'แผนกอายุรกรรม',
        'แผนกศัลยกรรม',
        'แผนกสูติ-นรีเวช',
        'แผนกจักษุ',
        'แผนกโรคผิวหนัง',
        'แผนกอวัยวะปัสสาวะ',
        'แผนกหัวใจ',
        'แผนกหู คอ จมูก',
        'แผนกรังสี',
        'แผนกรักษาโรคในช่องปากและฟัน'
    ];
    doctors = [
        'นพ.xxx xxx',
        'นพ.xxx xxx2',
        'นพ.xxx xxx3'
    ];
    constructor(private router: Router,private location: Location) {
    }
    goBack(): void {
        this.location.back();
    }
}
