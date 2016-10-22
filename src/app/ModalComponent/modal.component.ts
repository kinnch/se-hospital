import { Component, Input, trigger, animate, state, style, transition , OnChanges, SimpleChange, AfterViewInit } from '@angular/core';


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
        <h4 class="modal-title" >{{title}}</h4>
      </div>
      <div class="modal-body">
       <ng-content></ng-content>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" (click)="modalClose()">Close</button>
        <button type="button" class="btn btn-primary" (click)="callCallback()" >Save changes</button>
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
    @Input() size : string = "";
    @Input() id : string = "";
    @Input() title : string = "";
    @Input() callback: Function;
    sizeClass : string = "";
    modal;
    modalOpen(){
        this.modal.modal('show');
    }
    modalClose(){
        console.log("close");
        this.modal.modal('hide')
    }
    callCallback(){
        this.callback();
    }
}