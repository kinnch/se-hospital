import {Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'staff-c',
    template: require('./staff.component.html'),
    styles: [require('./staff.component.css')]
})

export class StaffComponent {
    constructor(private router: Router) {}
    isExpanded: Boolean = true;
    activatedClass = 1; //1 จัดการผู้ป่วย ,2,3,4
    gotoPage(menu):void{
        let link = ['manage'];
        this.activatedClass = menu;
        if(menu === 1){
            link = ['manage'];
        } else if(menu === 2){
            link = ['manage'];
        } else if(menu === 3){
            link = ['manage'];
        } else if(menu === 4){
            link = ['manage','manage_queue'];
        }
        this.router.navigate(link);
    }
    navToggle(){
        console.log("pohfy"); 
    }
}

