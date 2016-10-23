import {Component,OnInit, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
    selector: 'staff-c',
    template: require('./staff.component.html'),
    styles: [require('./staff.component.css')]
})

export class StaffComponent{
    
    loggedIn:boolean;
    constructor(private userService: UserService, private router: Router) {
        router.events.subscribe((val) => {
        //Check loggin 
            this.loggedIn = this.userService.isLoggedIn();
        });
        if(this.router.url === '/manage/doctor_calendar'){
            this.activatedClass = 2;
        } else if(this.router.url === '/manage/manage_queue'){
            this.activatedClass = 4;
        } else if(this.router.url === '/manage/patient'){
            this.activatedClass = 5;
        } else if(this.router.url === '/manage/prescription_request'){
            this.activatedClass = 6;
        } else if(this.router.url === '/manage/edit_prescription_request'){
            this.activatedClass = 7;
        }
    }
    
    // ngOnInit(): void {
    //     this.loggedIn = this.userService.isLoggedIn();
    // }
    hn = '123456';
    // isExpanded: Boolean = true;
    activatedClass = 1; //1 จัดการผู้ป่วย ,2,3,4

    gotoPage(menu):void{
        let link = ['manage'];
        this.activatedClass = menu;
        if(menu === 1){ // 1 จัดการผู้ป่วย
            link = ['manage','manage_patient'];
        } else if(menu === 2){
            link = ['manage','doctor_calendar'];
        } else if(menu === 3){
            link = ['manage','manage_staff'];
        } else if(menu === 4){ // 4 Checkin เข้าห้อง
            link = ['manage','manage_queue'];
        } else if(menu===5){ // 5 ตรวจร่างกาย
            link = ['manage','patient']
        } else if(menu===6){ // 6 รายการยา
            link = ['manage','prescription_request']
        } else if(menu===7){ // 6 แก้ไขรายการยา
            link = ['manage','edit_prescription_request']
        }
        this.router.navigate(link);
    }
    goToLogout():void{
        this.userService.logout();
        this.loggedIn=false;
        this.router.navigate(['manage','login']);
    }
    // navToggle(){
    //     console.log("pohfy"); 
    // }
}

