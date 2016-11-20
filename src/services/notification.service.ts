import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NotificationService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    sendSMS(tel:string, message:string) : Promise<JSON> {
        return this.http
                    .post('api/sendSMS', JSON.stringify({tel: tel,message:message}), {headers: this.headers})
                    .toPromise()
                    .then((res)=>{
                        return res.json();
                    });
    }
    sendSMSCreateAppt(tel:string,p_fname:string,p_lname:string,d_fname:string,d_lname:string,dep:string,appt_date:Date,appt_period:string) : Promise<JSON>{
        let message = `คุณ ${p_fname} ${p_lname} ได้ทำการนัดหมายแพทย์ ${d_fname} ${d_lname} แผนก ${dep} 
                        เพื่อเข้ารับการตรวจในวันที่ ${appt_date} เวลา ${appt_period}`
        return this.sendSMS(tel,message).then((res)=>{
            return res;
        });
    }
    sendSMSCancelAppt(tel:string,p_fname:string,p_lname:string,d_fname:string,d_lname:string,dep:string,appt_date:Date,appt_period:string) : Promise<JSON>{
        let message = `คุณ ${p_fname} ${p_lname} ได้ยกเลิกนัดหมายแพทย์ ${d_fname} ${d_lname} แผนก ${dep} 
                        เพื่อเข้ารับการตรวจในวันที่ ${appt_date} เวลา ${appt_period}`
        return this.sendSMS(tel,message).then((res)=>{
            return res;
        });
    }
    sendSMSNextAppt(tel:string,p_fname:string,p_lname:string,d_fname:string,d_lname:string,dep:string,appt_date:Date,appt_period:string) : Promise<JSON>{
        let message = `แพทย์ ${d_fname} ${d_lname} แผนก ${dep} ได้ทำการนัดหมายคุณ ${p_fname} ${p_lname}
                        เพื่อเข้ารับการตรวจในวันที่ ${appt_date} เวลา ${appt_period}`
        return this.sendSMS(tel,message).then((res)=>{
            return res;
        });
    }
    sendSMSDoctorCancelAppt(tel:string,p_fname:string,p_lname:string,d_fname:string,d_lname:string,dep:string,old_appt_date:Date,old_appt_period:string,appt_date:Date,appt_period:string) : Promise<JSON>{
        let message = `เนื่องจากแพทย์ ${d_fname} ${d_lname} แผนก ${dep} ไม่สามารถออกตรวจได้ในวันที่ ${old_appt_date} 
                        เวลา ${old_appt_period} จึงขอเปลี่ยนแปลงวันนัดหมายของคุณ ${p_fname} ${p_lname} เป็นวันที่
                        ${appt_date} เวลา ${appt_period} หากท่านไม่สะดวกในวันและเวลาดังกล่าว สามารถเปลี่ยนแปลงได้ทาง <link>
                        หรือติดต่อเจ้าหน้าที่ของโรงพยาบาลโดยตรง`
        return this.sendSMS(tel,message).then((res)=>{
            return res;
        });
    }
    sendSMSNotiAppt(tel:string,p_fname:string,p_lname:string,d_fname:string,d_lname:string,dep:string,appt_date:Date,appt_period:string) : Promise<JSON>{
        let message = `คุณ ${p_fname} ${p_lname} มีการนัดหมายแพทย์ ${d_fname} ${d_lname} แผนก ${dep} 
                        เพื่อเข้ารับการตรวจในวันที่ ${appt_date} เวลา ${appt_period}`
        return this.sendSMS(tel,message).then((res)=>{
            return res;
        });
    }
}