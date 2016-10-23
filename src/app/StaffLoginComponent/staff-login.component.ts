import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
@Component({
    selector: 'staff-login',
    template: require('./staff-login.component.html'),
    styles: [require('./staff-login.component.css')]
})
export class StaffLoginComponent{
    constructor(private userService: UserService, private router: Router) {}
    username;
    password;
    onSubmit() {
        this.userService.login(this.username, this.password).subscribe((result) => {
        if (result) {
            this.router.navigate(['manage']);
        }
        });
    }
}