import { Component , OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Params ,Router } from '@angular/router';
import { DiagnosisService } from '../../services/diagnosis.service';
import { AppointmentService } from '../../services/appointment.service';
import {Subscription } from 'rxjs';
import { ToastComponent } from '../ToastComponent/toast.component';
@Component({
    selector: 'add-diagnosis-c',
    template: require('./add-diagnosis.component.html'),
    styles: [require('./add-diagnosis.component.css')]
})

export class AddDiagnosisComponent implements OnInit {
    @ViewChild( ToastComponent ) toast: ToastComponent;
    data : any;
    enable = true;
    prescriptionToBeSave = [];
    diseases : any;
    diseasesSelector = [];
    diseasesSelectorReady = false;
    detail = '';
    selectedOption: Object[] = [];
    HN : string;
    private subscription: Subscription;
    patientAppointments : any;
    // currentAppointment : any;
    currentDate :string;
    currentPeriod : string;
    currentAppointmentID : string;
    patientID : string;
    drugListIsOK = true;
    errorText = '';
    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private diagnosisService : DiagnosisService,
                private appointmentService :AppointmentService) { }
    ngOnInit(){
        this.data = null;
        this.subscription = this.activatedRoute.params.subscribe(
            (param: any) => {
                this.HN = param['hn'];
                // console.log(this.HN);
                this.appointmentService.getPatientAndAppointment(this.HN)
                .then((data) => {
                    this.patientID = data['patient_data']['_id'];
                    // console.log(patient_id);
                    this.patientAppointments = data['appoint'];
                    console.log('all patient appointments');
                    console.log(this.patientAppointments);
                    for(var i =0 ;i<this.patientAppointments.length;i++){
                        if(this.patientAppointments[i]['appointments'][0]['status']==3){//currently diagnosing
                            this.currentDate =this.patientAppointments[i]['date'];
                            this.currentPeriod =this.patientAppointments[i]['timePeriod'];
                            this.currentAppointmentID = this.patientAppointments[i]['appointments'][0]['_id'];
                        }
                    }
                    this.diagnosisService.getAllDisease()
                                        .then((data) =>{
                                            this.diseases = data['diseases'];
                                            console.log('old diseases');
                                            console.log(this.diseases);
                                            for(var i = 0 ; i < this.diseases.length ; i++){
                                                this.diseasesSelector.push({key:i,value:this.diseases[i]['_id'],text:this.diseases[i]['icd10']+' '+this.diseases[i]['name']});
                                            }
                                            console.log('new diseases');
                                            console.log(this.diseasesSelector);
                                            this.diseasesSelectorReady = true;
                                        });            
                });
        });
        
    }
    
    handle(receivedData){
        
        var parsed = JSON.parse(receivedData);

        var arr = [];

        for(var x in parsed){
            arr.push(parsed[x]);
        }
        this.prescriptionToBeSave = arr;
        this.drugListIsOK = true;
        for (var i = 0 ; i<this.prescriptionToBeSave.length;i++){
            if(Number(this.prescriptionToBeSave[i]['amount'])>=0){
            }
            else{
                this.drugListIsOK = false;
            }
        }
        console.log('handle');
        console.log(this.drugListIsOK);
        console.log(this.prescriptionToBeSave);
    }
    saveDiagnosis(){
        if(this.detail==''){
            this.errorText = 'กรุณากรอกรายละเอียดการวินิจฉัย';
        }
        else if(!this.drugListIsOK){
            this.errorText = 'กรุณากรอกจำนวนยาให้ถูกต้อง(จำนวนยาต้องเป็นตัวเลขบวก)';
        }
        else{
            console.log('-----save----');
        console.log(this.detail);
        console.log(this.prescriptionToBeSave);
        console.log(this.selectedOption);
        var dataToSend = {
            drugList: this.prescriptionToBeSave,
            diseaseIDs: this.selectedOption,
            detail: this.detail,
            date: this.currentDate,
            doctorID: localStorage.getItem('user_id'),
            timePeriod: this.currentPeriod,
            patientID : this.patientID
        }
        console.log(dataToSend);
        this.diagnosisService.addDiagnosis(dataToSend)
            .then((data)=>{
                console.log(data);
                if(data['status']=='Success'){
                    this.appointmentService.diagnosisDoneAppointment(this.currentAppointmentID)
                        .then((data)=>{
                            if(data['status']=='success'){
                                // console.log("YEAH");
                                this.toast.titleSuccess = "บันทึกสำเร็จ"
                                this.toast.messageSuccess = "";
                                this.toast.addToastSuccess();
                                setTimeout(()=>{
                                    this.goback();
                                }, 3000);
                                
                            }
                            else{
                                this.toast.addToastError();
                            }
                        });
                }
            });
        }
        
        
        
        
    }
    goback(): void {
        window.history.back();
    }
}