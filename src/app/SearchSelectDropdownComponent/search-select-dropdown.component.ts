/// <reference path="../../../typings/globals/select2/index.d.ts" />
import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
    selector: 'search-select',
    template:`
       <select id="{{id}}" class="js-example-responsive " multiple="multiple"  style="width:100%;" (ngModelChange)="onChange($event)" >
            <option *ngFor="let issue of issues" value="{{issue.value}}" >{{issue.text}}</option>
       </select>
    `,
     styles: [require('./search-select-dropdown.component.css')]
})
export class SearchSelectDropdownComponent implements AfterViewInit, OnInit {

    @Input() id : string ;
    @Input() issues : Object[];
    @Output() onChange = new EventEmitter<string>();
    @Input() placeholder: string = "";
    selectedIssue : string;
    ngOnInit(){
        jQuery('#stylehere').append("<style>" + require('./search-select-dropdown.component.css')+"</style>");
    }
    ngAfterViewInit(){
        jQuery('#'+this.id).select2({
            placeholder: this.placeholder,
            allowClear: true
        });
        jQuery('#'+this.id).on(
            'change',
            (e) =>{ 
                this.selectedIssue = jQuery(e.target).val();
                this.onChange.emit(jQuery(e.target).val());
            }
        );
    }

}