import { Component, AfterViewInit , OnInit } from '@angular/core';
import { ModalComponent } from '../ModalComponent/modal.component';

@Component({
    selector: 'full-calendar',
    template: require('./doctor-calendar.component.html')
})

export class DoctorCalendarComponent implements AfterViewInit, OnInit {
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
                    title  : 'event1',
                    start  : '2016-10-22T09:00:00',
                    end : '2016-10-22T11:30:00',
                },
                {
                    title  : 'event2',
                    start  : '2016-10-22T09:00:00',
                    end : '2016-10-22T11:30:00',
                },
                {
                    title  : 'event3',
                    start  : '2016-10-22T13:00:00',
                    end : '2016-10-22T15:30:00',
                    // allDay : true
                },
                {
                    title  : 'event4',
                    start  : '2016-10-22T13:00:00',
                    end : '2016-10-22T15:30:00',
                    // allDay : true
                }
                // {
                //     title  : 'event2',
                //     start  : '2016-10-23',
                //     end    : '2016-10-25'
                // },
                // {
                //     title  : 'event3',
                //     start  : '2016-10-23T12:30:00',
                //     allDay : false // will make the time show
                // }
            ]
        });
        $(window).on('resize', function () {
            console.log("resize")
            $('.fc-content').height( $('.fc-content').width()*0.175);
        }).resize();
        // jQuery('#calendar .fc-toolbar .fc-right button')
        //     .removeClass()
        //     .addClass('button');
    }
    callback(){
        alert("callback from modal");
    }
    
}