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
    title:string;
    fname:string;
    lname:string;
    username:string;
    password:string;
    confirmPassword:string;
    roleId:number = 0;
    department:string = "0";
    departments = [];
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