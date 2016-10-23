import { Component, AfterViewInit , OnInit } from '@angular/core';
import { ModalComponent } from '../ModalComponent/modal.component';
import { DoctorDateElementService } from '../../services/doctor-date-element.service';

@Component({
    selector: 'full-calendar',
    template: require('./doctor-calendar.component.html')
})

export class DoctorCalendarComponent implements AfterViewInit, OnInit {
    constructor(private elementService: DoctorDateElementService){

    }
    ngOnInit(){
         jQuery('#stylehere').append("<style>" + require('./doctor-calendar.component.css')+"</style>");
    }
    ngAfterViewInit () {
       
        jQuery('#calendar').fullCalendar({
            aspectRatio: 1.35 ,
            eventClick: function(calEvent, jsEvent, view) {
                console.log('Event: ' + calEvent.title);
                console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                console.log('View: ' + view.name);

                // change the border color just for fun
                // $(this).css('border-color', 'red');

             },
            dayClick: function () {
               console.log('clicked');
               
            },
             events: [
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-01T09:00:00',
                    end : '2016-10-01T11:30:00',
                    color : "rgba(98, 208, 233, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-01T09:00:00',
                    end : '2016-10-01T11:30:00',
                    color : "rgba(255, 255, 0, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-02T09:00:00',
                    end : '2016-10-02T11:30:00',
                    color : "rgba(98, 208, 233, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-02T09:00:00',
                    end : '2016-10-02T11:30:00',
                    color : "rgba(255, 255, 0, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-03T09:00:00',
                    end : '2016-10-03T11:30:00',
                    color : "rgba(98, 208, 233, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-04T09:00:00',
                    end : '2016-10-04T11:30:00',
                    color : "rgba(255, 255, 0, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-05T09:00:00',
                    end : '2016-10-05T11:30:00',
                    color : "rgba(98, 208, 233, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-06T09:00:00',
                    end : '2016-10-06T11:30:00',
                    color : "rgba(255, 255, 0, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-07T09:00:00',
                    end : '2016-10-07T11:30:00',
                    color : "rgba(98, 208, 233, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-08T09:00:00',
                    end : '2016-10-08T11:30:00',
                    color : "rgba(255, 255, 0, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-09T09:00:00',
                    end : '2016-10-09T11:30:00',
                    color : "rgba(98, 208, 233, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-10T09:00:00',
                    end : '2016-10-10T11:30:00',
                    color : "rgba(255, 255, 0, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-11T09:00:00',
                    end : '2016-10-11T11:30:00',
                    color : "rgba(98, 208, 233, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-12T09:00:00',
                    end : '2016-10-12T11:30:00',
                    color : "rgba(255, 255, 0, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-13T09:00:00',
                    end : '2016-10-13T11:30:00',
                    color : "rgba(98, 208, 233, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-14T09:00:00',
                    end : '2016-10-14T11:30:00',
                    color : "rgba(255, 255, 0, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-15T09:00:00',
                    end : '2016-10-15T11:30:00',
                    color : "rgba(98, 208, 233, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-16T09:00:00',
                    end : '2016-10-16T11:30:00',
                    color : "rgba(255, 255, 0, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-16T09:00:00',
                    end : '2016-10-16T11:30:00',
                    color : "rgba(98, 208, 233, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-17T09:00:00',
                    end : '2016-10-17T11:30:00',
                    color : "rgba(255, 255, 0, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-17T09:00:00',
                    end : '2016-10-17T11:30:00',
                    color : "rgba(98, 208, 233, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-18T09:00:00',
                    end : '2016-10-18T11:30:00',
                    color : "rgba(255, 255, 0, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-19T09:00:00',
                    end : '2016-10-19T11:30:00',
                    color : "rgba(98, 208, 233, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-20T09:00:00',
                    end : '2016-10-20T11:30:00',
                    color : "rgba(255, 255, 0, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-21T09:00:00',
                    end : '2016-10-21T11:30:00',
                    color : "rgba(98, 208, 233, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-22T09:00:00',
                    end : '2016-10-22T11:30:00',
                    color : "rgba(255, 255, 0, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-23T09:00:00',
                    end : '2016-10-23T11:30:00',
                    color : "rgba(98, 208, 233, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-24T09:00:00',
                    end : '2016-10-24T11:30:00',
                    color : "rgba(255, 255, 0, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-25T09:00:00',
                    end : '2016-10-25T11:30:00',
                    color : "rgba(98, 208, 233, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-26T09:00:00',
                    end : '2016-10-26T11:30:00',
                    color : "rgba(255, 255, 0, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-27T09:00:00',
                    end : '2016-10-27T11:30:00',
                    color : "rgba(98, 208, 233, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-28T09:00:00',
                    end : '2016-10-28T11:30:00',
                    color : "rgba(255, 255, 0, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-29T09:00:00',
                    end : '2016-10-29T11:30:00',
                    color : "rgba(98, 208, 233, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-30T09:00:00',
                    end : '2016-10-30T11:30:00',
                    color : "rgba(255, 255, 0, 0.3)",
                    allDay: true
                },
                {
                    title  : '<i class="fa fa-circle left-event" aria-hidden="true"><span class="text-primary">      3/5</span></i> <i class="fa fa-circle right-event" aria-hidden="true">      3/5</i>',
                    start  : '2016-10-31T09:00:00',
                    end : '2016-10-31T11:30:00',
                    color : "rgba(98, 208, 233, 0.3)",
                    allDay: true
                },

            ]
        });
        $(window).on('resize', function () {
            console.log("resize")
            $('.fc-content').height( $('.fc-content').width()*0.350);
            $('.left-event').css('margin-top',$('.fc-content').height()*0.5);
            $('.left-event').css('margin-left',$('.fc-content').width()*0.2);
            $('.right-event').css('margin-top',$('.fc-content').height()*0.5);
            $('.right-event').css('margin-right',$('.fc-content').width()*0.2);
        }).resize();
        // jQuery('#calendar .fc-toolbar .fc-right button')
        //     .removeClass()
        //     .addClass('button');
    }
    callback(){
        alert("callback from modal");
    }
    
}