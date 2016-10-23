import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'login-c',
    template: require('./login.component.html'),
    styles: [require('./login.component.css')]
})

export class LoginComponent {
    constructor(private router: Router, private location: Location) {

    }
    login():void {
        
    }
    goBack(): void {
        this.location.back();
    }
}
