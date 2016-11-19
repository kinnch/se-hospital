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
    username='';
    password='';
    onSubmit() {
        this.userService.login(this.username, this.password).subscribe((result) => {
            if (result) {
                let userRoleId = localStorage.getItem('user_roleID');
                let link = [];
                if(userRoleId == "1"){
                    link = ['manage','manage_patient'];
                } else if(userRoleId == "2"){
                    link = ['manage','manage_queue'];
                } else if(userRoleId == "3"){
                    link = ['manage','manage_queue'];
                } else if(userRoleId == "4"){
                    link = ['manage','prescription_request'];
                }
                this.router.navigate(link);  
            }
        });
    }
}