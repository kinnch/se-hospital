/// <reference path="../../typings/index.d.ts" />

import {Component} from '@angular/core';
import {PatientComponent} from './PatientComponent/patient.component';
@Component({
    selector: 'my-app',
    template: `
    <router-outlet></router-outlet>    
    `
    

})

export class AppComponent {}
