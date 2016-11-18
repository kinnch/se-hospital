import { Component, AfterViewInit , OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../ModalComponent/modal.component';
import { DoctorDateElementService } from '../../services/doctor-date-element.service';
import * as moment from 'moment';

@Component({
    selector: 'full-calendar',
    template: require('./doctor-calendar.component.html')
})

export class DoctorCalendarComponent implements AfterViewInit, OnInit {
    @ViewChild( ModalComponent ) modal1: ModalComponent; 
    events: Object[] = [];
    titleModal: string = "รายละเอียดการออกตรวจ";
    numbers = Array(5).map((x,i)=>i);
    isOperate: boolean  = true;
    selectedEvent;

    constructor(private elementService: DoctorDateElementService){
       
    }
    ngOnInit(){
         jQuery('#stylehere').append("<style>" + require('./doctor-calendar.component.css')+"</style>");
          moment.locale('th');
    }
    ngAfterViewInit () {
        this.fetchAndAdaptData();
        

    }
    fetchAndAdaptData(){
        this.elementService.getDoctorDateElements().then((jsonObject) => {
           jsonObject.table.forEach((e)=>{
            var img = e["_id"]["period"] == "am" ? `<img src="/resources/images/sun-rise.png" width="70%" style="float: left;" >` : `<img src="/resources/images/noon.png" width="70%" style="float: left;" >`;
                this.events.push(
                    {
                        title  : `<div class="col-sm-1 padd-right-unset"><div class="row">${img}</div><div class="row" style="padding-right:10px; color: #ff9800;"><i class="fa fa-stethoscope"  ></i></div></div><i class="fa left-event" aria-hidden="true"><span class="doc-num-left"> ${e.doctors}/5</span></i> <i class="fa pull-right right-event" aria-hidden="true"><span class="doc-num-left" style="color:rgb(217, 83, 79)"> ${e.patients}/15</span></i>`,
                        start  : moment(e["_id"]["date"]).format(),
                        allDay: true,
                        backgroundColor : "rgba(171,71,188,0)",
                        borderColor : e["_id"]["period"] == "am"? "rgba(113, 183, 85, 0.72)": "rgba(71, 164, 179, 0.58)",
                        // url : e,
                        id : e 
                    }
                );
               
           })
        }).then(() => {
            var self = this;
            jQuery('#calendar').fullCalendar({
                aspectRatio: 1.35 ,
                eventClick: function(calEvent, jsEvent, view) {
                    console.log(calEvent.id);
                    var data = calEvent.id
                    console.log('Event: ' + calEvent.title);
                    console.log('Event id : '+ calEvent.id);
                    console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                    console.log('View: ' + view.name);
                    self.selectedEvent = calEvent;
                    console.log( moment(new Date(calEvent.start)).format("ll"));
                    console.log(moment.locale());
                    var period = data["_id"]["period"] == "am" ? 'เช้า' : 'บ่าย';
                    self.titleModal = "รายละเอียดของช่วง<span class='text-primary'>        "+ period +"       วันที่         "+ moment(new Date(calEvent.start)).format("ll")+"</span>";
                    self.modal1.modalOpen();
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
        // $('.left-event').css('margin-left',$('.fc-content').width()*0.2);
        $('.right-event').css('margin-top',$('.fc-content').height()*0.5);
        // $('.right-event').css('margin-right',$('.fc-content').width()*0.2);
    }
    
}