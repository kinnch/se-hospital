import { Component, AfterViewInit } from '@angular/core';

@Component({
    selector: 'full-calendar',
    template: '<div id="calendar"></div>',
    styles: [require('./doctor-calendar.component.css')]
})

export class DoctorCalendarComponent implements AfterViewInit {
    ngAfterViewInit () {
      
       jQuery('#calendar').fullCalendar({
            aspectRatio: 1.35 ,
            dayClick: function () {
               console.log('clicked');
               
            },
             events: [
                {
                    title  : 'event1',
                    start  : '2016-10-22'
                },
                {
                    title  : 'event8',
                    start  : '2016-10-22T12:30:00',
                    end : '2016-10-22T18:30:00',
                    allDay : false
                },
                {
                    title  : 'event2',
                    start  : '2016-10-23',
                    end    : '2016-10-25'
                },
                {
                    title  : 'event3',
                    start  : '2016-10-23T12:30:00',
                    allDay : false // will make the time show
                }
            ]
        });
        $(window).on('resize', function () {
            console.log("resize")
            $('.fc-content').height( $('.fc-content').width()*0.4);
        }).resize();

        // jQuery('#calendar .fc-toolbar .fc-right button')
        //     .removeClass()
        //     .addClass('button');
    }
    
}