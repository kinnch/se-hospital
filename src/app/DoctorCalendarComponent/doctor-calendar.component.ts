import { Component, AfterViewInit , OnInit } from '@angular/core';
import { ModalComponent } from '../ModalComponent/modal.component';
import { DoctorDateElementService } from '../../services/doctor-date-element.service';
import * as moment from 'moment';

@Component({
    selector: 'full-calendar',
    template: require('./doctor-calendar.component.html')
})

export class DoctorCalendarComponent implements AfterViewInit, OnInit {
    events: Object[] = [];
    constructor(private elementService: DoctorDateElementService){
       
    }
    ngOnInit(){
         jQuery('#stylehere').append("<style>" + require('./doctor-calendar.component.css')+"</style>");
    }
    ngAfterViewInit () {
        this.fetchAndAdaptData();
        

    }
    fetchAndAdaptData(){
        this.elementService.getDoctorDateElements().then((jsonObject) => {
           jsonObject.forEach((e)=>{
            //    (e["_id"]["period"] == "am")
                this.events.push(
                    {
                        title  : `<i class="fa fa-circle-o left-event" aria-hidden="true"><span class="text-primary">      ${e.doctors}/5</span></i> <i class="fa fa-circle-o right-event" aria-hidden="true">      ${e.patients}/15</i>`,
                        start  : moment(e["_id"]["date"]).format(),
                        color : e["_id"]["period"] == "am"? "rgba(98, 208, 233, 0.3)": "rgba(255, 255, 0, 0.3)",
                        allDay: true,
                        id : "id_tmp" 
                    }
                );
               
           })
        }).then(() => {
            var self = this;
            jQuery('#calendar').fullCalendar({
                aspectRatio: 1.35 ,
                eventClick: function(calEvent, jsEvent, view) {
                    console.log('Event: ' + calEvent.title);
                    console.log('Event id : '+ calEvent.id);
                    console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                    console.log('View: ' + view.name);
                },
                dayClick: function () {
                console.log('clicked');
                
                },
                events: this.events
            });
            $(window).on('resize', function () {
                console.log("resize")
                self.resizeData()
                $(".fc-prev-button").on("click", function(){ self.resizeData() });
                $(".fc-next-button").on("click", function(){ self.resizeData() });
            }).resize();

        });
        
    }

    callback(){
        alert("callback from modal");
    }

    resizeData(){
        $('.fc-content').height( $('.fc-content').width()*0.350);
        $('.left-event').css('margin-top',$('.fc-content').height()*0.5);
        $('.left-event').css('margin-left',$('.fc-content').width()*0.2);
        $('.right-event').css('margin-top',$('.fc-content').height()*0.5);
        $('.right-event').css('margin-right',$('.fc-content').width()*0.2);
    }
    
}