import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NotificationService {
    private headers = new Headers({'Content-Type': 'application/json'});
    private apiSendSMSUrl = 'api/sendSMS';
    private apiSendEmailUrl = 'api/sendEmail';
    constructor(private http: Http) { }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
    // ================ SMS ======================
    sendSMS(tel:string, message:string) : Promise<JSON> {
        return this.http
                    .post(this.apiSendSMSUrl, JSON.stringify({tel: tel,message:message}), {headers: this.headers})
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
    sendSMSPostponeAppt(tel:string,p_fname:string,p_lname:string,d_fname:string,d_lname:string,dep:string,old_appt_date:Date,old_appt_period:string,appt_date:Date,appt_period:string) : Promise<JSON>{
        let message = `คุณ ${p_fname} ${p_lname} ได้เลื่อนนัดหมายแพทย์ ${d_fname} ${d_lname} แผนก ${dep} 
                        เพื่อเข้ารับการตรวจจาก วันที่ ${appt_date} เวลา ${appt_period} 
                        เป็นวันที่ ${appt_date} เวลา ${appt_period}`
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
    sendSMSDoctorNextAppt(tel:string,p_fname:string,p_lname:string,d_fname:string,d_lname:string,dep:string,appt_date:Date,appt_period:string) : Promise<JSON>{
        let message = `แพทย์ ${d_fname} ${d_lname} แผนก ${dep} ได้ทำการนัดหมายคุณ ${p_fname} ${p_lname}
                        เพื่อเข้ารับการตรวจในวันที่ ${appt_date} เวลา ${appt_period}`
        return this.sendSMS(tel,message).then((res)=>{
            return res;
        });
    }
    sendSMSDoctorCancelAppt(tel:string,p_fname:string,p_lname:string,d_fname:string,d_lname:string,dep:string,old_appt_date:Date,old_appt_period:string,appt_date:Date,appt_period:string) : Promise<JSON>{
        let message = `เนื่องจากแพทย์ ${d_fname} ${d_lname} แผนก ${dep} ไม่สามารถออกตรวจได้ในวันที่ ${old_appt_date} 
                        เวลา ${old_appt_period} จึงขอเปลี่ยนแปลงวันนัดหมายของคุณ ${p_fname} ${p_lname} เป็นวันที่
                        ${appt_date} เวลา ${appt_period} หากท่านไม่สะดวกในวันและเวลาดังกล่าว สามารถเปลี่ยนแปลงได้ทาง www.teppadungporn.com
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
    sendSMSStaffCancelAppt(tel:string,p_fname:string,p_lname:string,d_fname:string,d_lname:string,dep:string,appt_date:Date,appt_period:string) : Promise<JSON>{
        let message = `การนัดพบแพทย์ของคุณ ${p_fname} ${p_lname} วันที่ ${appt_date} เวลา ${appt_period} ถูกยกเลิก เนื่องจากแพทย์ ${d_fname} ${d_lname} แผนก ${dep} มีติดธุระฉุกเฉิน กรุณาเข้ามาสร้างนัดใหม่ที่ระบบของเว็บไซต์ ขออภัยมา ณ ที่นี้`;
        return this.sendSMS(tel,message).then((res)=>{
            return res;
        });
    }
    // ================ Email ======================
    sendEmail(receiver:string,subject:string,text:string): Promise<JSON>{
        return this.http
                    .post(this.apiSendEmailUrl, JSON.stringify({receiver: receiver,subject:subject,text:text}), {headers: this.headers})
                    .toPromise()
                    .then((res)=>{
                        return res.json();
                    });
    }
    sendEmailCreateAppt(receiver:string,p_fname:string,p_lname:string,d_fname:string,d_lname:string,dep:string,appt_date:Date,appt_period:string) : Promise<JSON>{
        let subject = `สร้างการนัดหมายสำเร็จ`
        let text = `เรียน คุณ ${p_fname} ${p_lname} <br><br>
                    คุณได้ทำการนัดหมาย แพทย์ ${d_fname} ${d_lname} แผนก ${dep} 
                    เพื่อเข้ารับการตรวจในวันที่ ${appt_date} เวลา ${appt_period} <br>
                    หากต้องการเปลี่ยนแปลงการนัดหมาย สามารถเปลี่ยนแปลงได้ทาง www.teppadungporn.com
                    หรือติดต่อเจ้าหน้าที่ของโรงพยาบาลโดยตรง <br><br>
                    ขอบพระคุณที่ให้ความไว้วางใจในโรงพยาบาลเทพพดุงพร`
        return this.sendEmail(receiver,subject,text).then((res)=>{
            return res;
        });
    }
    sendEmailPostponeAppt(receiver:string,p_fname:string,p_lname:string,d_fname:string,d_lname:string,dep:string,old_appt_date:Date,old_appt_period:string,appt_date:Date,appt_period:string) : Promise<JSON>{
        let subject = `เลื่อนการนัดหมายสำเร็จ`
        let text = `เรียน คุณ ${p_fname} ${p_lname} <br><br>
                    คุณได้เลื่อนนัดหมาย แพทย์ ${d_fname} ${d_lname} แผนก ${dep} 
                    เพื่อเข้ารับการตรวจจากวันที่ ${old_appt_date} เวลา ${old_appt_period}
                    เป็นวันที่ ${appt_date} เวลา ${appt_period} <br>
                    หากต้องการเปลี่ยนแปลงการนัดหมาย สามารถเปลี่ยนแปลงได้ทาง www.teppadungporn.com
                    หรือติดต่อเจ้าหน้าที่ของโรงพยาบาลโดยตรง <br><br>
                    ขอบพระคุณที่ให้ความไว้วางใจในโรงพยาบาลเทพพดุงพร`
        return this.sendEmail(receiver,subject,text).then((res)=>{
            return res;
        });
    }
    sendEmailCancelAppt(receiver:string,p_fname:string,p_lname:string,d_fname:string,d_lname:string,dep:string,appt_date:Date,appt_period:string) : Promise<JSON>{
        let subject = `ยกเลิกการนัดหมายสำเร็จ`
        let text = `เรียน คุณ ${p_fname} ${p_lname} <br><br>
                    คุณได้ยกเลิกนัดหมาย แพทย์ ${d_fname} ${d_lname} แผนก ${dep} 
                    เพื่อเข้ารับการตรวจในวันที่ ${appt_date} เวลา ${appt_period} <br>
                    หากต้องการต้องการทำการนัดหมายใหม่อีกครั้ง สามารถนัดหมายได้ทาง www.teppadungporn.com
                    หรือติดต่อเจ้าหน้าที่ของโรงพยาบาลโดยตรง <br><br>
                    ขอบพระคุณที่ให้ความไว้วางใจในโรงพยาบาลเทพพดุงพร`
        return this.sendEmail(receiver,subject,text).then((res)=>{
            return res;
        });
    }
    sendEmailDoctorNextAppt(receiver:string,p_fname:string,p_lname:string,d_fname:string,d_lname:string,dep:string,appt_date:Date,appt_period:string) : Promise<JSON>{
        let subject = `คุณมีนัดหมายใหม่`
        let text = `เรียน คุณ ${p_fname} ${p_lname} <br><br>
                    แพทย์ ${d_fname} ${d_lname} แผนก ${dep} 
                    ได้ทำการนัดหมายคุณเพื่อเข้ารับการตรวจในวันที่ ${appt_date} เวลา ${appt_period} <br>
                    หากต้องการเปลี่ยนแปลงการนัดหมาย สามารถเปลี่ยนแปลงได้ทาง www.teppadungporn.com
                    หรือติดต่อเจ้าหน้าที่ของโรงพยาบาลโดยตรง <br><br>
                    ขอบพระคุณที่ให้ความไว้วางใจในโรงพยาบาลเทพพดุงพร`
        return this.sendEmail(receiver,subject,text).then((res)=>{
            return res;
        });
    }
    sendEmailDoctorCancelAppt(receiver:string,p_fname:string,p_lname:string,d_fname:string,d_lname:string,dep:string,old_appt_date:Date,old_appt_period:string,appt_date:Date,appt_period:string) : Promise<JSON>{
        let subject = `ขออณุญาตเลื่อนนัดหมายใหม่เป็นวันที่ ${appt_date} เวลา ${appt_period}`
        let text = `เรียน คุณ ${p_fname} ${p_lname} <br><br>
                    เนื่องจากแพทย์ ${d_fname} ${d_lname} แผนก ${dep} 
                    ไม่สามารถออกตรวจได้ในวันที่ ${old_appt_date} เวลา ${old_appt_period}
                    จึงขอเปลี่ยนแปลงวันนัดหมายของคุณเป็นวันที่ ${appt_date} เวลา ${appt_period} <br>
                    หากท่านไม่สะดวกในวันและเวลาดังกล่าว สามารถเปลี่ยนแปลงได้ทาง www.teppadungporn.com
                    หรือติดต่อเจ้าหน้าที่ของโรงพยาบาลโดยตรง <br><br>
                    ทางโรงพยาบาลโรงพยาบาลเทพพดุงพร ต้องขออภัยในความไม่สะดวกมา ณ ที่นี้`
        return this.sendEmail(receiver,subject,text).then((res)=>{
            return res;
        });
    }
    sendEmailNotiAppt(receiver:string,p_fname:string,p_lname:string,d_fname:string,d_lname:string,dep:string,appt_date:Date,appt_period:string) : Promise<JSON>{
        let subject = `คุณมีนัดหมายในวันที่ ${appt_date} เวลา ${appt_period}`
        let text = `เรียน คุณ ${p_fname} ${p_lname} <br><br>
                    คุณมีการนัดหมาย แพทย์ ${d_fname} ${d_lname} แผนก ${dep} 
                    เพื่อเข้ารับการตรวจในวันที่ ${appt_date} เวลา ${appt_period} <br>
                    หากต้องการต้องเปลี่ยนแปลงการนัดหมาย สามารถนัดหมายได้ทาง www.teppadungporn.com
                    หรือติดต่อเจ้าหน้าที่ของโรงพยาบาลโดยตรง <br><br>
                    ขอบพระคุณที่ให้ความไว้วางใจในโรงพยาบาลเทพพดุงพร`
        return this.sendEmail(receiver,subject,text).then((res)=>{
            return res;
        });
    }
    sendEmailStaffCancelAppt(receiver:string,p_fname:string,p_lname:string,d_fname:string,d_lname:string,dep:string,appt_date:Date,appt_period:string) : Promise<JSON>{
        let subject = `นัดหมายในวันที่ ${appt_date} เวลา ${appt_period}ถูกยกเลิก`
        let text = `เรียน คุณ ${p_fname} ${p_lname} \n\n
                    การนัดพบแพทย์ของคุณ เนื่องจากแพทย์ ${d_fname} ${d_lname} แผนก ${dep} มีติดธุระฉุกเฉิน\n 
                    กรุณาเข้ามาสร้างนัดใหม่ ที่ <link>
                    หรือติดต่อเจ้าหน้าที่ของโรงพยาบาลโดยตรง \n\n
                    ขออภัยมา ณ ที่นี้ และขอบพระคุณที่ให้ความไว้วางใจในโรงพยาบาลเทพพดุงพร`
        return this.sendEmail(receiver,subject,text).then((res)=>{
            return res;
        });
    }
}