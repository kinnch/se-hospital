import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { HospitalEmployeeService } from '../../services/hospital-employee.service';
import { DepartmentService } from '../../services/department.service';
import { ToastComponent } from '../ToastComponent/toast.component';

@Component({
    selector: 'add-hospital-employee-c',
    template: require('./add-hospital-employee.component.html'),
    styles: [require('./add-hospital-employee.component.css')]
})

export class AddHospitalEmployeeComponent implements OnInit {
    @ViewChild( ToastComponent ) toast :ToastComponent;
    title:string = "";
    fname:string = "";
    lname:string = "";
    username:string = "";
    password:string = "";
    confirmPassword:string = "";
    roleId:number = 0;
    department:string = "0";
    departments = [];

    errorTitle = "";
    errorFname = "";
    errorLname = "";
    errorUsername = "";
    errorPassword = "";
    errorConfirmPassword = "";
    errorRole = "";
    errorDepartment = "";
    constructor(private router: Router,
                private hospitalEmployeeService: HospitalEmployeeService,
                private departmentService: DepartmentService
                ) {}
    ngOnInit(): void {
        this.departmentService.getAllDepartments().then((departments)=>{
            this.departments = departments['departments'];
        });
    }
    goback():void{
        window.history.back();
    }
    addHospitalEmployee():void{
        if(this.validate()){
            this.hospitalEmployeeService.addHospitalEmployee(this.username,this.password,this.roleId,this.department,this.title,this.fname,this.lname)
                .then((res)=>{
                        if (res == "success") {
                            this.toast.titleSuccess = "เพิ่มสำเร็จ"
                            this.toast.messageSuccess = "ทำการเพิ่มบุคลากรสำเร็จ"
                            this.toast.addToastSuccess();                            
                            setTimeout(()=>
                                { this.router.navigate(['manage','manage_staff']); }
                            , 3000);
                        } else{
                            this.toast.addToastError();
                        }
                });
        }
        
    }
    validate():boolean{
        let isPass = true;
        if(this.title == "") this.errorTitle = "กรุณากรอกคำนำหน้าชื่อ";
        else if(!/^[ก-๙|a-z|A-Z|\.]+$/.test(this.title)) this.errorTitle = "คำนำหน้าชื่อควรประกอบด้วยอักขระภาษาไทย, อักขระภาษาอังกฤษ หรือจุด(.) และมีความยาวอย่างน้อย 2 ตัวอักษร"
        else {
            this.errorTitle = "";
            isPass = true;
        }
        isPass = false;
        if(this.fname == "") this.errorFname = "กรุณากรอกชื่อ";
        else if(!/^[ก-๙|a-z|A-Z]+$/.test(this.fname)) this.errorFname = "ชื่อควรประกอบด้วยอักขระภาษาไทย หรือภาษาอังกฤษเท่านั้น และมีความยาวไม่เกิน 50 ตัวอักษร";
        else if(this.fname.length > 50) this.errorFname = "ชื่อควรมีความยาวไม่เกิน 50 ตัวอักษร"
        else {
            this.errorFname = "";
            isPass = true;
        }
        isPass = false;
        if(this.lname == "") this.errorLname = "กรุณากรอกนามสกุล";
        else if(!/^[ก-๙|a-z|A-Z]+$/.test(this.lname)) this.errorLname = "นามสกุลควรประกอบด้วยอักขระภาษาไทย หรือภาษาอังกฤษเท่านั้น และมีความยาวไม่เกิน 50 ตัวอักษร";
        else if(this.lname.length > 50) this.errorLname = "นามสกุลควรมีความยาวไม่เกิน 50 ตัวอักษร"
        else {
            this.errorLname = "";
            isPass = true;
        }
        isPass = false;
        if(this.username == "") this.errorUsername = "กรุณากรอกชื่อบัญชีผู้ใช้";
        else if(!/^[a-z|A-Z|0-9|_]+$/.test(this.username)) this.errorUsername = "ชื่อบัญชีผู้ใช้ควรประกอบด้วยอักขระภาษาอังกฤษ, ตัวเลข 0-9 หรือ Underscore(_) เท่านั้น และมีความยาวไม่เกิน 60 ตัวอักษร";
        else if(this.username.length > 50) this.errorUsername = "ชื่อบัญชีผู้ใช้ควรมีความยาวไม่เกิน 50 ตัวอักษร"
        else {
            this.errorUsername = "";
            isPass = true;
        }
        isPass = false;
        if(this.password == "") this.errorPassword = "กรุณากรอกรหัสผ่าน";
        else if(this.password.length > 100) this.errorPassword = "รหัสผ่านควรมีความยาวไม่เกิน 100 ตัวอักษร"
        else {
            this.errorPassword = "";
            isPass = true;
        }
        isPass = false;
        if(this.confirmPassword == "") this.errorConfirmPassword = "กรุณากรอกรหัสผ่านอีกครั้ง";
        else if(this.password != this.confirmPassword) this.errorConfirmPassword = "กรุณากรอกรหัสผ่านให้ตรงกัน";
        else {
            this.errorConfirmPassword = "";
            isPass = true;
        }
        isPass = false;
        if(this.roleId == 0) this.errorRole = "กรุณาเลือกตำแหน่ง";
        else {
            this.errorRole = "";
            isPass = true;
        }
        isPass = false;
        if(this.department == "0") this.errorDepartment = "กรุณาเลือกแผนก";
        else {
            this.errorDepartment = "";
            isPass = true;
        }
        return isPass;
    }
}