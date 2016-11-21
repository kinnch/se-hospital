import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PatientService } from '../../services/patient.service';
import { PrescriptionService } from '../../services/prescription.service';
import { ToastComponent } from '../ToastComponent/toast.component';
import { ModalComponent } from '../ModalComponent/modal.component';

@Component({
    selector: 'register-c',
    template: require('./register.component.html'),
    styles: [require('./register.component.css')]
})

export class RegisterComponent implements OnInit{
    @ViewChild( ToastComponent ) toast :ToastComponent;
    @ViewChild( ModalComponent ) modal: ModalComponent;
    title: string = "";
    firstName: string = "";
    lastName: string = "";
    nationalID: string = "";
    address: string = "";
    province: string = "";
    district: string = "";
    subdistrict: string = "";
    postCode: string = "";
    tel: string = "";
    email: string = "";
    sex: string = "no";
    birthDate: Date;
    bloodType: string = "no";

    drugs: any; 
    currentDrugId: number = 1;
    allegicDrugsList : any[] = [];
    allegicDrugs: string[] = [];

    errTitle = "";
    errfirstName ="";
    errlastName ="";
    errnationalID = "";
    errtel ="";
    erremail ="";
    errsex ="";
    errbirthDate = "";
    errbloodtype="";

    constructor(private router: Router, 
                private location: Location,
                private patientService: PatientService, 
                private prescriptionService: PrescriptionService
                ) {}
    
    ngOnInit() {
        this.prescriptionService.getAllDrugs()
            .then((res) => {
                this.drugs = res['msg'];
                // console.log(this.drugs);
        });
    }
    addAllegicDrugField() {
        // this.myform = 'hello';
        this.allegicDrugsList.push({id:this.currentDrugId, drugID:""});
        this.currentDrugId++;
        // console.log(this.allegicDrugsList);
    }
    deleteAllegicDrugField(index) {
        // console.log("delete");
        this.allegicDrugsList.splice(index, 1);
    }
    bindsBack(selectedValue,i){
        // console.log('myFormChange');
		this.allegicDrugsList[i].drugID = selectedValue;
        // console.log(this.allegicDrugsList[i]);
    }


    goBack(): void {
        this.location.back();
    }
    register(): void {
       if(this.validate()){
            for(let drug of this.allegicDrugsList) {
                if(drug['drugID'])
                    this.allegicDrugs.push(drug['drugID']);
            }
            this.patientService.createPatient(this.email, this.title, this.firstName, this.lastName, this.sex, this.birthDate, this.tel, this.nationalID, this.address, this.subdistrict, this.district, this.province, this.postCode, this.allegicDrugs, this.bloodType)
            .then((res)=>{
                console.log(res);
                if(res['status'] == "success") {
                    console.log("register success!");
                    this.modal.modalOpen();
                } else {
                    console.log("register fail!")
                    this.toast.addToastError();
                }
            });
        }      
    }

    validate():boolean{
        let isPass = false;
        if(this.title == "") this.errTitle = "กรุณากรอกคำนำหน้าชื่อ";
        else if(!/^[ก-๙|a-z|A-Z|\.]+$/.test(this.title)) this.errTitle = "คำนำหน้าชื่อควรประกอบด้วยอักขระภาษาไทย, อักขระภาษาอังกฤษ หรือจุด(.) และมีความยาวอย่างน้อย 2 ตัวอักษร"
        else this.errTitle = "";

        if(this.firstName == "") this.errfirstName = "กรุณากรอกชื่อ";
        else if(!/^[ก-๙|a-z|A-Z]+$/.test(this.firstName)) this.errfirstName = "ชื่อควรประกอบด้วยอักขระภาษาไทย หรือภาษาอังกฤษเท่านั้น และมีความยาวไม่เกิน 50 ตัวอักษร";
        else this.errfirstName = "";

        if(this.lastName == "") this.errlastName = "กรุณากรอกนามสกุล";
        else if(!/^[ก-๙|a-z|A-Z]+$/.test(this.lastName)) this.errlastName = "นามสกุลควรประกอบด้วยอักขระภาษาไทย หรือภาษาอังกฤษเท่านั้น และมีความยาวไม่เกิน 50 ตัวอักษร";
        else this.errlastName = "";

        if(this.nationalID == "") this.errnationalID = "กรุณากรอกรหัสประจำตัวประชาชน";
        else if(this.nationalID != ""){
            if(!/^\d{13}$/.test(this.nationalID)){
                this.errnationalID = "รหัสประจำตัวประชาชนควรประกอบด้วยตัวเลข 0-9 และมีความยาว 13 ตัวอักษร";
            }
            else this.errnationalID = "";            
        }
        else this.errnationalID = "";

        if(this.tel == "") this.errtel = "กรุณากรอกเบอร์โทรศัพท์";
        else if(this.tel != ""){
            if(!/^\d{10}$/.test(this.tel)) this.errtel = "เบอร์โทรศัพท์ควรประกอบด้วยตัวเลข 0-9 และมีความยาว 10 ตัวอักษร"
            else this.errtel = "";            
        }
        else this.errtel = "";            
        

        if(this.email != ""){
            if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/) this.erremail = "รูปแบบของ Email ไม่ถูกต้อง"
        }
        else this.erremail = "";

        if(this.sex  == "no") this.errsex = "กรุณาเลือกเพศ";
        else this.errsex = "";

        if(this.bloodType == "no") this.errbloodtype = "กรุณาเลือกกรุ๊ปเลือด";
        else this.errbloodtype = "";

        if(this.birthDate == null) this.errbirthDate = "กรุณาเลือกวันเกิด";
        else this.errbirthDate = "";

        if(!this.errbirthDate && !this.errbloodtype && !this.erremail && !this.errfirstName && !this.errlastName && !this.errnationalID && !this.errsex && !this.errtel && !this.errTitle)
            isPass = true;
        console.log('-----');
        console.log(isPass);
        return isPass;
    }
}
