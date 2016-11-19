import {Component, Input} from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
    selector: 'toast',
    template: `
        <ng2-toasty [position]="'top-right'"></ng2-toasty>
    `
})

export class ToastComponent {
    constructor(    private toastyService:ToastyService, 
                    private toastyConfig: ToastyConfig) {
                        this.toastyConfig.theme = 'bootstrap';
        }
    @Input() titleSuccess : string = "บันทึกสำเร็จ";
    @Input() messageSuccess : string = "ทำการบันทึกข้อมูลเรียบร้อยแล้ว";
    @Input() timeoutSuccess = 3000;
    @Input() titleError : string = "เกิดข้อผิดพลาด";
    @Input() messageError : string = "กรุณาทำรายการใหม่อีกครั้งค่ะ";
    @Input() timeoutError = 10000;
    @Input() titleWarning : string = "";
    @Input() messageWarning : string = "";
    @Input() timeoutWarning = 10000;
    @Input() titleWait : string = "";
    @Input() messageWait : string = "";
    @Input() timeoutWait = 10000;
    @Input() titleInfo : string = "";
    @Input() messageInfo : string = "";
    @Input() timeoutInfo = 10000;
    

    addToastSuccess(){
        var toastSuccess:ToastOptions = {
                title: this.titleSuccess,
                msg: this.messageSuccess,
                showClose: true,
                timeout: this.timeoutSuccess,
                theme: 'bootstrap',
            };
        this.toastyService.success(toastSuccess);
    }
    addToastError(){
        var toastError:ToastOptions = {
                title: this.titleError,
                msg: this.messageError,
                showClose: true,
                timeout: 3000,
                theme: 'bootstrap',
            };
        this.toastyService.error(toastError);
    }
    addToastWarning(){
        var toastWarning:ToastOptions = {
                title: this.titleError,
                msg: this.messageError,
                showClose: true,
                timeout: this.timeoutError,
                theme: 'bootstrap',
            };
        this.toastyService.warning(toastWarning);
    }
    addToastInfo(){
        var toastInfo:ToastOptions = {
                title: this.titleError,
                msg: this.messageError,
                showClose: true,
                timeout: this.timeoutInfo,
                theme: 'bootstrap',
            };
        this.toastyService.info(toastInfo);
    }
    addToastWait(){
        var toastWait:ToastOptions = {
                title: this.titleError,
                msg: this.messageError,
                showClose: true,
                timeout: this.timeoutWait,
                theme: 'bootstrap',
            };
        this.toastyService.wait(toastWait);
    }

}