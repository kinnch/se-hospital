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
    greetingMSG : string ="";

    constructor(private userService: UserService, private router: Router, private location: Location) {
    }


    

    // Login
    sendOTP(): void {
        this.isLoading = true;
        this.loadingMSG = "กำลังตรวจสอบรหัส OTP";
        this.errorMSG = "";
         if(this.OTPCode.length != 6){
            console.log(this.OTPCode.length);
            this.errorMSG = "ความยาวOTP(6)ไม่ถูกต้อง";
            this.isLoading = false;
        }else if ( !/^[0-6]*$/g.test(this.OTPCode)) {
            this.errorMSG = "รูปแบบเลขบัตรประชาชนหรือเลขHN ไม่ถูกต้อง";
            this.isLoading = false;
        }else{
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
                
                }else{
                    this.isLoading = false;
                    this.errorMSG =  "รหัส OTP ไม่ถูกต้องกรูณากรอกใหม่อกครั้ง"
                }
            });
        }

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
        this.step =1;
        this.errorMSG = "";
        this.isLoading = true;
        this.loadingMSG = "กำลังติดต่อระบบ..";
        var reg = new RegExp('/^[0-9]*$/g');
        if(this.patientID.length != 8 && this.patientID.length!=13 ){
            console.log(this.patientID.length);
            this.errorMSG = "ความยาวเลขบัตรประชาชน(13)หรือเลขHN(8) ไม่ถูกต้อง";
            this.isLoading = false;
        }else if ( !/^[0-9]*$/g.test(this.patientID)) {
            this.errorMSG = "รูปแบบเลขบัตรประชาชนหรือเลขHN ไม่ถูกต้อง";
            this.isLoading = false;
        }
        else{
            this.userService.search(this.patientID).then( (data) => { 
                // alert(data);
                console.log(data["status"]== null);
                if(data["status"]== null ){
                    //success
                    this.loadingMSG = "สวัสดีคุณ "+data['patient_data']["name"]["fname"]+" "+data['patient_data']["name"]["lname"]+", กำลังขอ OTP"
                    var str = ''+data['patient_data']["tel"];
                    this.phoneNo = str.substring(0,3)+" - "+ str.substring(3,6)+ " - xxxx";
                    this.username = str;
                    this.greetingMSG= "สวัสดีคุณ "+data['patient_data']["name"]["fname"]+" "+data['patient_data']["name"]["lname"];
                    this.userService.requestOTP(this.patientID).then((data) => {
                        if(data["success"]){
                            //success
                            this.step=2;
                            this.isLoading = false;
                            this.errorMSG = "";
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
    checkOnly(){
        alert("checkOnly");
        this.errorMSG = "";
        this.isLoading = true;
        this.loadingMSG = "กำลังติดต่อระบบ..";
        this.userService.search(this.patientID).then( (data) => { 
            if(data["status"]== null ){
                //success
                this.loadingMSG = "สวัสดีคุณ "+data['patient_data']["name"]["fname"]+" "+data['patient_data']["name"]["lname"]+", กำลังขอ OTP"
                var str = ''+data['patient_data']["tel"];
                this.phoneNo = str.substring(0,3)+" - "+ str.substring(3,6)+ " - xxxx";
                this.username = str;
                 this.step=2;
                this.isLoading = false;
                this.errorMSG = "";
                this.greetingMSG= "สวัสดีคุณ "+data['patient_data']["name"]["fname"]+" "+data['patient_data']["name"]["lname"];

            }else{
                this.errorMSG = " ไม่พบชื่อผู้ใช้งาน";
                this.isLoading = false;
            }
           
            
             
            
        }
    }
}
