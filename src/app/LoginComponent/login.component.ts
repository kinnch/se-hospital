import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'login-c',
    template: require('./login.component.html'),
    styles: [require('./login.component.css')]
})

export class LoginComponent {
    patientID: string;
    phoneNo: string;
    OTPCode: string;
    username: string;

    loginSuccess: boolean = false;
    sendOTPSuccess: boolean = true;
    loadingMSG: string ="";
    errorMSG: string = "";
    step : number = 1;
    isLoading : boolean = false;
    constructor(private userService: UserService, private router: Router, private location: Location) {
    }


    

    // Login
    sendOTP(): void {
        this.isLoading = true;
       this.userService.loginPatient(this.username , this.OTPCode ).subscribe((result) => {
            if (result) {
                this.isLoading = false;
                this.step = 3;
                var i = 400;
                while(i>0){
                    i--;
                    // console.log(i);
                }
                this.router.navigate(['patient']);
              
            }
        });
    }
    OTPauth(OTP: string): boolean {
        return OTP == "999999";
    }
    verifyOTP(): void {
        if (this.OTPauth(this.OTPCode)) { // success
        alert("OTP passed!");    
        this.router.navigate(['patient']);
        } else {
            alert("OTP is mismatched!");
            this.sendOTPSuccess = false;
        }
    }
    goBack(): void {
        this.location.back();
    }

    checkAndRequest() {
        // search api and will get phone
        this.isLoading = true;
        this.loadingMSG = "กำลังติดต่อระบบ.." 
        this.userService.search(this.patientID).then( (data) => { 
            // alert(data);
            console.log(data["status"]== null);
            if(data["status"]== null ){
                //success
                this.loadingMSG = "สวัสดีคุณ "+data['patient_data']["name"]["fname"]+" "+data['patient_data']["name"]["lname"]+", กำลังขอ OTP"
                var str = ''+data['patient_data']["tel"];
                this.phoneNo = str.substring(0,3)+" - "+ str.substring(3,6)+ " - xxxx";
                this.username = str;
                this.userService.requestOTP(this.patientID).then((data) => {

                    if(data["success"]){
                        //success
                        this.step=2;
                        this.isLoading = false;
                    }else{
                        this.errorMSG = " ระบบ OTP ไม่พร้อมใช้งาน กรุณารอสักครู่";
                        this.isLoading = false;
                    }
                    
                });
            }else{
                this.errorMSG = " ไม่พบชื่อผู้ใช้งาน";
                this.isLoading = false;
            }
           
            
             
            
        });
    }
}
