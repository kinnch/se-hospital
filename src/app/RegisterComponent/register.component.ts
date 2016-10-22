import {Component, Input} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 
@Component({
    selector: 'register-c',
    template: require('./register.component.html'),
    styles: [require('./register.component.css')]
})

export class RegisterComponent{
    constructor(private router: Router,private location: Location) {
    }
    goBack(): void {
        this.location.back();
    }
}
