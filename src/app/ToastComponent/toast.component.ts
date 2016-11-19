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
    @Input() titleError : string = "เกิดข้อผิดพลาด";
    @Input() messageError : string = "กรุณาทำรายการใหม่อีกครั้งค่ะ";
    @Input() titleWarning : string = "";
    @Input() messageWarning : string = "";
    @Input() titleWait : string = "";
    @Input() messageWait : string = "";
    @Input() titleInfo : string = "";
    @Input() messageInfo : string = "";

    addToastSuccess(){
        var toastSuccess:ToastOptions = {
                title: this.titleSuccess,
                msg: this.messageSuccess,
                showClose: true,
                timeout: 3000,
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
                timeout: 3000,
                theme: 'bootstrap',
            };
        this.toastyService.warning(toastWarning);
    }
    addToastInfo(){
        var toastInfo:ToastOptions = {
                title: this.titleError,
                msg: this.messageError,
                showClose: true,
                timeout: 3000,
                theme: 'bootstrap',
            };
        this.toastyService.info(toastInfo);
    }
    addToastWait(){
        var toastWait:ToastOptions = {
                title: this.titleError,
                msg: this.messageError,
                showClose: true,
                timeout: 3000,
                theme: 'bootstrap',
            };
        this.toastyService.wait(toastWait);
    }

}