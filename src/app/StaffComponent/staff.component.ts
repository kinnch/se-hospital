import {Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'staff-c',
    template: require('./staff.component.html'),
    styles: [require('./staff.component.css')]
})

export class StaffComponent {
    constructor(private router: Router) {
        if(this.router.url === '/manage/manage_queue'){
            this.activatedClass = 4;
        }
    }
    // isExpanded: Boolean = true;
    activatedClass = 1; //1 จัดการผู้ป่วย ,2,3,4

    gotoPage(menu):void{
        let link = ['manage'];
        this.activatedClass = menu;
        if(menu === 1){ // 1 จัดการผู้ป่วย
            link = ['manage','manage_patient'];
        } else if(menu === 2){
            link = ['manage'];
        } else if(menu === 3){
            link = ['manage','manage_staff'];
        } else if(menu === 4){ // 4 Checkin เข้าห้อง
            link = ['manage','manage_queue'];
        } else if(menu===5){
            link = ['manage','patient','hn']
        }
        this.router.navigate(link);
    }
    // navToggle(){
    //     console.log("pohfy"); 
    // }
}

