import {Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'diagnosis-history-c',
    template: require('./diagnosis-history.component.html'),
    styles: [require('./diagnosis-history.component.css')]
})

export class DiagnosisHistoryComponent {
    constructor(private router: Router) {}
      gotoPage(hn,choice):void{
        let link = ['manage'];
        if(choice == 1){
            link = ['manage','patient','check',hn];
        } else if(choice == 2){
            link = ['manage','diagnosis','detail',hn];
        } else if(choice == 3){
            link = ['manage','diagnosis','add',hn];
        }
      this.router.navigate(link);
    }
}