/// <reference path="../../typings/index.d.ts" />

import {Component} from '@angular/core';
import {PatientComponent} from './PatientComponent/patient.component';
@Component({
    selector: 'my-app',
    template: `
    <a routerLink="/staff">staff</a>
    <a routerLink="/manage">manage</a>
    <a routerLink="/manage/manage_patient">managePatient</a>
    <router-outlet></router-outlet>    
    `
    

})

export class AppComponent {}
