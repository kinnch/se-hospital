import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { ModalComponent } from '../ModalComponent/modal.component';
import { HospitalEmployeeService } from '../../services/hospital-employee.service';
import { DepartmentService } from '../../services/department.service';


@Component({
    selector: 'manage-hospital-employee-c',
    template: require('./manage-hospital-employee.component.html'),
    styles: [require('./manage-hospital-employee.component.css')]
})

export class ManageHospitalEmployeeComponent implements OnInit{
    @ViewChild( ModalComponent ) modal: ModalComponent; 
    employees = [];
    departments = [];
    doctors = [];
    nurses = [];
    pharmacists = [];
    staffs = [];
    departmentId:string = "0";
    fname:string = ""; //selected
    lname:string = ""; //selected
    staffId:string = ""; //selected
    constructor(private router: Router, 
                private hospitalEmployeeService: HospitalEmployeeService,
                private departmentService: DepartmentService) {
    }
    ngOnInit(): void {
        this.departmentService.getAllDepartments().then((departments)=>{
            this.departments = departments['departments'];
            console.log(this.departments);
        });
    }
    getEachDepStaff(depId):void{
        this.doctors = [];
        this.nurses = [];
        this.pharmacists = [];
        this.staffs = [];
        this.hospitalEmployeeService.getAllHospitalEmployees().then((hospitalEmps)=>{
            console.log(hospitalEmps['employees']);
            this.employees = hospitalEmps['employees'];
            this.employees.forEach((employee)=>{
                if(employee.department == depId){
                    if(employee.roleID === 1){
                        this.staffs.push(employee)                       
                    }
                    else if(employee.roleID === 2){
                        this.doctors.push(employee)   
                    }
                    else if(employee.roleID === 3){
                        this.nurses.push(employee)                       
                    }
                    else if(employee.roleID === 4){
                        this.pharmacists.push(employee)                       
                    }
                }
            });
        });
    }
    onChangeDep(depId):void{
        this.getEachDepStaff(depId);
    }
    changePwd(event):void{
        let id = event.target.attributes.id.nodeValue;     
        let staffId = id.substr(4,id.length);
        this.employees.forEach((employee)=>{
            console.log(staffId)
            if(employee._id == staffId){
                this.fname = employee.name.fname;
                this.lname = employee.name.lname;
                this.staffId = staffId;
                this.modal.modalOpen();
            }
        });
    }
    
    confirm():void{
        this.modalClose();
    }
}
