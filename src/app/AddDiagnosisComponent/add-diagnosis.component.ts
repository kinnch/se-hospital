import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'add-diagnosis-c',
    template: require('./add-diagnosis.component.html'),
    styles: [require('./add-diagnosis.component.css')]
})

export class AddDiagnosisComponent {
    data : any;
    enable = true;
    prescriptionToBeSave = [];
    constructor(private router: Router) { }
    ngOninit(){
        this.data = [];
    }
    handle(receivedData){
        
        var parsed = JSON.parse(receivedData);

        var arr = [];

        for(var x in parsed){
        arr.push(parsed[x]);
        }
        this.prescriptionToBeSave = arr;
        console.log('handle');
        console.log(this.prescriptionToBeSave);
    }
    goback(): void {
        window.history.back();
    }
}