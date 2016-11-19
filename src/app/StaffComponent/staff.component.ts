import {Component,OnInit, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
@Component({
    selector: 'staff-c',
    template: require('./staff.component.html'),
    styles: [require('./staff.component.css')]
})

export class StaffComponent{
    userRoleId = localStorage.getItem('user_roleID'); //1=staff, 2=doctor, 3=nurse, 4=pharmacist
    userRole = "";
    userFname = localStorage.getItem('user_fname');
    userLname = localStorage.getItem('user_lname');
    userTitle = localStorage.getItem('user_title');
    userSex = "male";
    userPic = "";

    loggedIn:boolean;
    constructor(private userService: UserService, private router: Router) {
        router.events.subscribe((val) => {
        //Check loggin 
            this.loggedIn = this.userService.isLoggedIn();
            this.userRoleId = localStorage.getItem('user_roleID');
            this.userFname = localStorage.getItem('user_fname');
            this.userLname = localStorage.getItem('user_lname');
            this.userTitle = localStorage.getItem('user_title');

            this.userRole = (this.userRoleId == "1") ? "เจ้าหน้าที่ของโรงพยาบาล" : 
                        (this.userRoleId == "2") ? "แพทย์" : 
                        (this.userRoleId == "3") ? "พยาบาล" : 
                        (this.userRoleId == "4") ? "เภสัชกร" : "ไม่มีในระบบ";
            this.userPic =  (this.userRoleId == "1" && this.userSex == "male") ? 
                            "/resources/images/icon_people/m_staff.png" : 
                            (this.userRoleId == "1" && this.userSex == "female") ? 
                            "/resources/images/icon_people/fm_staff.png" :
                            (this.userRoleId == "2" && this.userSex == "male") ? 
                            "/resources/images/icon_people/m_doctor.png" :
                            (this.userRoleId == "2" && this.userSex == "female") ? 
                            "/resources/images/icon_people/fm_doctor.png" :
                            (this.userRoleId == "3" && this.userSex == "male") ? 
                            "/resources/images/icon_people/m_nurse.png" :
                            (this.userRoleId == "3" && this.userSex == "female") ? 
                            "/resources/images/icon_people/fm_nurse.png" :
                            (this.userRoleId == "4" && this.userSex == "male") ? 
                            "/resources/images/icon_people/m_phar.png" :
                            (this.userRoleId == "4" && this.userSex == "male") ? 
                            "/resources/images/icon_people/fm_phar.png" : 
                            "/resources/images/icon_people/m_staff.png";
            
        });
        //TODO
        if(this.router.url === '/manage/manage_doctor_calendar'){
            this.activatedClass = 2;
        } else if(this.router.url === '/manage/manage_queue'){
            this.activatedClass = 4;
        } else if(this.router.url === '/manage/manage_queue'){
            this.activatedClass = 5;
        } else if(this.router.url === '/manage/prescription_request'){
            this.activatedClass = 6;
        } else if(this.router.url === '/manage/edit_prescription_request'){
            this.activatedClass = 7;
        } else if(this.router.url === '/manage/manage_queue'){
            this.activatedClass = 8;
        }
    }
    
    ngOnInit(): void {
        // this.loggedIn = this.userService.isLoggedIn();
    }
    hn = '123456';
    isExpandedNav: Boolean = true;
    activatedClass = 1; //1 จัดการผู้ป่วย ,2,3,4

    gotoPage(menu):void{
        let link = ['manage'];
        this.activatedClass = menu;
        if(menu === 1){ // 1 จัดการผู้ป่วย
            link = ['manage','manage_patient'];
        } else if(menu === 2){
            link = ['manage','manage_doctor_calendar'];
        } else if(menu === 3){
            link = ['manage','manage_staff'];
        } else if(menu === 4){ // 4 Checkin เข้าห้อง
            link = ['manage','manage_queue'];
        } else if(menu===5){ // 5 ตรวจร่างกาย
            link = ['manage','manage_queue']
        } else if(menu===6){ // 6 รายการยา
            link = ['manage','prescription_request']
        } else if(menu===7){ // 6 แก้ไขรายการยา
            link = ['manage','edit_prescription_request']
        } else if(menu===8){
            link = ['manage','manage_queue'];
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

