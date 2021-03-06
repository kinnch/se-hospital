import { Component, OnInit, ViewChild} from '@angular/core';
import { ModalComponent } from '../ModalComponent/modal.component';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

import { PatientService } from '../../services/patient.service';
import { AppointmentService } from '../../services/appointment.service';
import * as moment_ from 'moment';

@Component({
    selector: 'patient-panel-c',
    template: require('./patient-panel.component.html'),
    styles: [require('./patient-panel.component.css')]
})

export class PatientPanelComponent implements OnInit {
	@ViewChild( ModalComponent ) deleteModal: ModalComponent;
	selected_appt_id: string;
	ageYear: number;
    ageMonth: number; 

	
	patient_id: string;
	patient_title: string;
	patient_fname: string;
	patient_lname: string;
	department_id: string;
	patient_email: string;
	patient_tel: string;
	patient_nationalID: string;
	patient_birthDate: string;
	patient_HN: string;
	patient_bloodType: string;
	patient_address_detail: string;
    patient_address_subDistrict: string;
    patient_address_distict: string;
    patient_address_province: string;
    patient_address_postCode: string;
	patient_sex: string;

	patient_data: any;

	appointments: any[];

    constructor(private router: Router,
                private PatientService: PatientService,
				private AppointmentService: AppointmentService) {
    }

    ngOnInit():void{
        moment_.locale('th');
        // console.log(localStorage.getItem('patient_id'));

        //   console.log(localStorage.getItem('patient_title'));
        //   console.log(localStorage.getItem('patient_fname'));
        //   console.log(localStorage.getItem('patient_lname'));

        //   console.log(localStorage.getItem('patient_email'));
        //   console.log(localStorage.getItem('patient_tel'));
        //   console.log(localStorage.getItem('patient_nationalID'));
        //   console.log(localStorage.getItem('patient_birthDate'));
        //   console.log(localStorage.getItem('patient_HN'));

        //   console.log(localStorage.getItem('patient_bloodType'));

        //   console.log(localStorage.getItem('patient_address_detail'));
        //   console.log(localStorage.getItem('patient_address_subDistrict'));
        //   console.log(localStorage.getItem('patient_address_distict'));
        //   console.log(localStorage.getItem('patient_address_province'));
        //   console.log(localStorage.getItem('patient_address_postCode'));

        //   console.log(localStorage.getItem('patient_sex'));




		this.patient_id = localStorage.getItem('patient_id');

		this.patient_title = localStorage.getItem('patient_title');
		this.patient_fname = localStorage.getItem('patient_fname');
		this.patient_lname = localStorage.getItem('patient_lname');
		
		this.patient_email = localStorage.getItem('patient_email');
		this.patient_tel = localStorage.getItem('patient_tel');
		this.patient_nationalID = localStorage.getItem('patient_nationalID');
		this.patient_birthDate = localStorage.getItem('patient_birthDate');
		this.patient_HN = localStorage.getItem('patient_HN');

		this.patient_bloodType = localStorage.getItem('patient_bloodType');

		this.patient_address_detail = localStorage.getItem('patient_address_detail');
		this.patient_address_subDistrict = localStorage.getItem('patient_address_subDistrict');
		this.patient_address_distict = localStorage.getItem('patient_address_distict');
		this.patient_address_province = localStorage.getItem('patient_address_province');
		this.patient_address_postCode = localStorage.getItem('patient_address_postCode');

		this.patient_sex = localStorage.getItem('patient_sex');

		// age
		var diffDuration = moment_.duration(moment_().diff(this.patient_birthDate));
        this.ageYear = diffDuration.years();
        this.ageMonth = diffDuration.months();

		this.AppointmentService.getPatientAndAppointment(this.patient_nationalID).then((p_data)=>{
			this.patient_data = p_data;
			this.appointments = p_data['appoint'];

			// Change output date format
			for(let i in this.appointments) 
				this.appointments[i].dateAndPeriod = moment_(this.appointments[i].date).format('ll') + ' - ' + ((this.appointments[i].timePeriod == 'am')? 'ช่วงเช้า':'ช่วงบ่าย'); 

			console.log(this.patient_data);
		});
	}

	tryToDeleteAppointment(appt_id) {
		this.selected_appt_id = appt_id;
		this.deleteModal.modalOpen();
	}

	deleteAppointment(appt_id) {
		console.log("DEL:  "+appt_id);

		this.AppointmentService.deleteAppointment(appt_id).then( (jsonObj) => {
			this.deleteModal.modalClose();
			if(jsonObj['status'] == 'Success') {
				console.log("delete done");
				console.log(this.appointments);
				for(let i in this.appointments) {
					console.log(this.appointments[i]['appointments'][0]['_id']);
					if(this.appointments[i]['appointments'][0]['_id']==appt_id) {
						this.appointments.splice(i, 1);
						console.log("delete appointment element: "+appt_id);
						break;
					}
				}
			} else {
				console.log("delete fail");
			}
		});
	}
}
