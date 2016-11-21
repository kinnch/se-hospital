import { Component, Input, trigger, animate, state, style, transition , OnChanges, SimpleChange, AfterViewInit, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'modal',
    template:`
        <div class="modal fade" id="{{id}}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog {{sizeClass}}" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" (click)="modalClose()" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title" [innerHtml]="title" ></h4>
      </div>
      <div class="modal-body">
       <ng-content></ng-content>
      </div>
      <div class="modal-footer" *ngIf="isShowFooter">
        <button type="button" class="btn btn-secondary" (click)="callCallbackCancel()" *ngIf="enableCancel">{{close}}</button>
        <button type="button" class="btn btn-primary" (click)="callCallbackSuccess()" >{{success}}</button>
      </div>
    </div>
  </div>
</div>
    `
})
export class ModalComponent implements AfterViewInit {
    ngAfterViewInit(){
        this.modal= jQuery('#'+this.id);
        switch(this.size){
            case "lg" : this.sizeClass="modal-lg"; break;
            case "sm" : this.sizeClass="modal-sm"; break;
        }
    }
    @Input() enableCancel: boolean = true;
    @Input() size : string = "";
    @Input() id : string = "";
    @Input() title : string = "";
    @Input() success : string = "บันทึก";
    @Input() close : string = "ยกเลิก";
    @Input() isShowFooter : boolean = true;
    @Input() callbackSuccess: Function = function(){ console.log("do not thing : success")};
    @Input() callbackCancel: Function = function(){ console.log("do not thing : cancel")};
    @Output() modalSuccess = new EventEmitter();
    @Output() modalCancel = new EventEmitter();
    sizeClass : string = "";
    modal;
    modalOpen(){
        this.modal.modal('show');
    }
    modalClose(){
        console.log("close");
        this.modal.modal('hide')
    }
    callCallbackSuccess(){
        this.modal.modal('hide')
        this.modalSuccess.emit();
        // this.callbackSuccess();
    }
    callCallbackCancel(){
        this.modal.modal('hide')
         this.modalCancel.emit();
        // this.callbackCancel();
    }
}