import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'login-c',
    template: require('./login.component.html'),
    styles: [require('./login.component.css')]
})

export class LoginComponent {
    constructor(private router: Router) {

    }
    login():void {
        
    }
    gotoRegister():void {
        let link = ['register'];
        this.router.navigate(link);
    }
}
