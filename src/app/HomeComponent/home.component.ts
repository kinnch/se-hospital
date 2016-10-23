import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home-c',
    template: require('./home.component.html'),
    styles: [require('./home.component.css')]
})

export class HomeComponent {
    constructor(private router: Router) {

    }
    gotoLogin():void{
        let link = ['login'];
        this.router.navigate(link);
    }
}
