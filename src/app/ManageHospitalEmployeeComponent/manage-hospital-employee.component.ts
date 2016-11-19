import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { ModalComponent } from '../ModalComponent/modal.component';
import { ToastComponent } from '../ToastComponent/toast.component';
import { HospitalEmployeeService } from '../../services/hospital-employee.service';
import { DepartmentService } from '../../services/department.service';

@Component({
    selector: 'manage-hospital-employee-c',
    template: require('./manage-hospital-employee.component.html'),
    styles: [require('./manage-hospital-employee.component.css')]
})

export class ManageHospitalEmployeeComponent implements OnInit{
    @ViewChild( ModalComponent ) modal: ModalComponent; 
    @ViewChild( ToastComponent ) toast: ToastComponent;
    employees = [];
    departments = [];
    doctors = [];
    nurses = [];
    pharmacists = [];
    staffs = [];
    departmentId:string = "0";
    selectedFname:string = ""; //selected
    selectedLname:string = ""; //selected
    selectedStaffId:string = ""; //selected
    selectedPass:string = ""; //selected
    selectedConfirmPass:string = ""; //selected
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
                    employee.isShowed = true;
                    if(employee.roleID === 1){
                        this.staffs.push(employee)                       
                    }
                    else if(employee.roleID === 2){
                        this.doctors.push(employee)   
                        console.log(">>",this.doctors) 
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
    changePwd(staffId):void{
        this.employees.forEach((employee)=>{
            console.log(staffId)
            if(employee._id == staffId){
                this.selectedFname = employee.name.fname;
                this.selectedLname = employee.name.lname;
                this.selectedStaffId = staffId;
                this.modal.modalOpen();
            }
        });
    }
    removeEmpRole(roleID,staffId):void{
        if(roleID === 1){
            this.staffs.forEach((staff)=>{
                if(staff._id == staffId){
                    staff.isShowed = false;
                }
            })
        }
        else if(roleID === 2){
            this.doctors.forEach((doctor)=>{
                if(doctor._id == staffId){
                    doctor.isShowed = false;
                    console.log(doctor);
                }
            })
        }
        else if(roleID === 3){
            this.nurses.forEach((nurse)=>{
                if(nurse._id == staffId){
                    nurse.isShowed = false;
                }    
            })                   
        }
        else if(roleID === 4){
            this.pharmacists.forEach((pharmacist)=>{
                if(pharmacist._id == staffId){
                    pharmacist.isShowed = false;
                }  
            })                            
        }
    }
    removeStaff(roleID,staffId):void{  
        this.hospitalEmployeeService.removeStaff(staffId).then((res)=>{
            if(res == "success"){
                this.removeEmpRole(roleID,staffId);
                // this.getEachDepStaff(this.departmentId);
                console.log("deleted");
            }
        })
    }
    confirmChangePass():void{
        this.hospitalEmployeeService.changePassword(this.selectedStaffId,this.selectedPass).then((res)=>{
            if(res == "success"){
                this.selectedPass = "";
                this.selectedConfirmPass = "";
                console.log("confirm")
                this.toast.addToastSuccess();
            }
            else{
                this.toast.addToastError();
            }
        });
    }
    cancelChangePass():void{
        this.selectedPass = "";
        this.selectedConfirmPass = "";
        console.log("cancel")
    }
}
