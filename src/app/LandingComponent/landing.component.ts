import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'landing',
    template: require('./landing.component.html'),
    styles: [require('./landing.component.css')]
})

export class LandingComponent {
   

    constructor(private userService: UserService, private router: Router, private location: Location) {
    }
    
    goBack(): void {
        this.location.back();
    }
  
}
