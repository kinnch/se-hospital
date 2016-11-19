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

    loginSuccess: boolean = false;
    sendOTPSuccess: boolean = true;

    step : number = 1;
    isLoading : boolean = false;
    constructor(private userService: UserService, private router: Router, private location: Location) {
    }

    // Login NationalID (or) #HN
    auth(patientID: string): boolean {
        return patientID == "1234";
    }
    login(): void {
        var link = [''];
        if (this.auth(this.patientID)) { // success
            this.loginSuccess = true;
        } else {
            alert("Login Failed!");
        }

    }

    // OTP Auth
    sendOTP(): void {
        // Send OTP via SMS API
        // var sendSuccess = sendOTP_SMS(this.phoneNo);

        // if(sendSuccess)
            this.sendOTPSuccess = true;
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
        this.userService.search(this.patientID).then( (data) => { 
            alert(data);
            this.step=2;
            this.isLoading = false;
        });
    }
}
