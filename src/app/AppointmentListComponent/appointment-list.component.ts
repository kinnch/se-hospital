import {Component, Input,ViewChild} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ModalComponent } from '../ModalComponent/modal.component';
import { AppointmentService } from '../../services/appointment.service';
import { NotificationService } from '../../services/notification.service';
import { ToastComponent } from '../ToastComponent/toast.component';
import { Router } from '@angular/router';
@Component({
    selector: 'appointment-list-c',
    template: require('./appointment-list.component.html'),
    styles: [require('./appointment-list.component.css')]
})

export class AppointmentListComponent{
    @ViewChild( ToastComponent ) toast: ToastComponent;
    @ViewChild( ModalComponent ) modal: ModalComponent;
    @Input() data:JSON;
    constructor(private router: Router,private appointmentService : AppointmentService ,private notificationService: NotificationService) {
    }
    openConfirm(){
        this.modal.modalOpen();
    }
    cancelDelete(){

    }
    confirmDelete(appointment){
        console.log('confirmed Delete');
        // console.log(appointmentID);
        console.log(this.data['patient_data']);
        this.appointmentService.deleteAppointment(appointment['appointments'][0]['_id'])
        .then((data)=>{
            console.log(data);
            if(data['status']=='Success'){
                this.toast.titleSuccess = "ลบสำเร็จ"
                this.toast.messageSuccess = "";
                this.toast.addToastSuccess();
                console.log("deleted");
                //send sms and email
                // this.notificationService.sendSMSStaffCancelAppt(tel:string,p_fname:string,p_lname:string,d_fname:string,d_lname:string,dep:string,appt_date:Date,appt_period:string)
                this.notificationService.sendSMSStaffCancelAppt(
                        this.data['patient_data']['tel'],
                        this.data['patient_data']['name']['fname'],
                        this.data['patient_data']['name']['lname'],
                        appointment['doctor']['name']['fname'],
                        appointment['doctor']['name']['lname'],
                        appointment['doctor']['department']['name'],
                        appointment['date2'],
                        appointment['tiemPeriod2'])
                    .then((data)=>{
                        console.log('sms sended');
                        console.log(data);
                    });
                // this.sendEmailStaffCancelAppt(receiver:string,p_fname:string,p_lname:string,d_fname:string,d_lname:string,dep:string,appt_date:Date,appt_period:string) : Promise<JSON>{
                this.notificationService.sendEmailStaffCancelAppt(
                        this.data['patient_data']['email'],
                        this.data['patient_data']['name']['fname'],
                        this.data['patient_data']['name']['lname'],
                        appointment['doctor']['name']['fname'],
                        appointment['doctor']['name']['lname'],
                        appointment['doctor']['department']['name'],
                        appointment['date2'],
                        appointment['tiemPeriod2'])
                    .then((data)=>{
                        console.log('email sended');
                        console.log(data);
                    });
                

                for(var i=0;i<this.data['appoint'].length;i++){
                    if(this.data['appoint'][i]['appointments'][0]['_id'] == appointment['appointments'][0]['_id']){
                        this.data['appoint'].splice(i, 1);
                        console.log(this.data);
                    }
                }
                
            }
        });
    }
    printAppointment(appointment,patientData){
        //,fname,lname,date,periodTime,doctor,department,reason
        console.log('start printing');
        console.log(appointment);
        console.log(patientData);
        this.appointmentService.printAppointment(appointment['appointments'][0]['_id'])
        .then((data)=>{
            console.log(data);
            if(data['status']=='success'){
                console.log('print passed');
            }
        });
        var mywindow = window.open('', 'PRINT', 'height=600,width=1000');
        
    
        mywindow.document.write('<html><head><title>' + 'Print appointment'  + '</title>');
    //     mywindow.document.write(`
    //     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.4/css/bootstrap.min.css" integrity="sha384-2hfp1SzUoho7/TsGGGDaFdsuuDL0LX2hnUp6VkX3CUQ2K4K+xjboZdsXyp4oUHZj" crossorigin="anonymous">
    //  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js" integrity="sha384-THPy051/pYDQGanwU6poAc/hOdQxjnOEXzbT+OuUAFqNqFjL+4IGLBgCJC3ZOShY" crossorigin="anonymous"></script>
    //  <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.2.0/js/tether.min.js" integrity="sha384-Plbmg8JY28KFelvJVai01l8WyZzrYWG825m+cZ0eDDS1f7d/js6ikvy1+X+guPIB" crossorigin="anonymous"></script>
    //  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.4/js/bootstrap.min.js" integrity="sha384-VjEeINv9OSwtWFLAtmc4JCtEJXXBub00gtSnszmspDLCtC0I4z4nqz7rEFbIZLLU" crossorigin="anonymous"></script>
    //     `);
        // mywindow.document.write(`
        
        // `)
        mywindow.document.write('</head><body>');
        mywindow.document.write(
            
        `
        <h3 style="text-align:center">โรงพยาบาลเทพผดุงพร</h3>
        <h4 style="text-align:center">ใบนัดหมาย</h4>
        <hr>
        <p> รหัสผู้ป่วย : ${patientData['HN']} </p>
        <p> ชื่อ-นามสกุล : ${patientData['name']['title']}${patientData['name']['fname']} ${patientData['name']['lname']}</p>
        <p> วันที่ : ${appointment['date2']}</p>
        <p> เวลา : ${appointment['timePeriod2']}</p>
        <p>แพทย์ : ${appointment['doctor']['name']['title']}${appointment['doctor']['name']['fname']} ${appointment['doctor']['name']['lname']} </p>
        <p>แผนก : ${appointment['doctor']['department']['name']} </p>
        <p>สาเหตุ : ${appointment['appointments'][0]['reason']} </p>
        `)
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();

        return true;

    }
}
