import { Component, AfterViewInit , OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../ModalComponent/modal.component';
import { DoctorDateElementService } from '../../services/doctor-date-element.service';
import * as moment from 'moment';
import { SearchSelectDropdownComponent } from '../SearchSelectDropdownComponent/search-select-dropdown.component';       


@Component({
    selector: 'staff-full-calendar',
    template: require('./staff-calendar.component.html')
})

export class StaffCalendarComponent implements AfterViewInit, OnInit {
    @ViewChild( ModalComponent ) modal1: ModalComponent; 
    events: Object[] = [];
    titleModal: string = "รายละเอียดการออกตรวจ";
    numbers = Array(5).map((x,i)=>i);
    isOperate: boolean  = true;
    selectedEvent;
    issues=[
        {
            "key":1,
            "value" : 2,
            "text" : "asdadasdas"
        },
        {
            "key":2,
            "value" : 3,
            "text" : "asd"
        }
        ];

    constructor(private elementService: DoctorDateElementService){
       
    }
    ngOnInit(){
         jQuery('#stylehere').append("<style>" + require('./staff-calendar.component.css')+"</style>");
          moment.locale('th');
    }
    ngAfterViewInit () {
        this.fetchAndAdaptData();
        

    }
    fetchAndAdaptData(){
        this.elementService.getDoctorDateElements().then((jsonObject) => {
           jsonObject.table.forEach((e)=>{
            //    (e["_id"]["period"] == "am")
                this.events.push(
                    {
                        title  : `<i class="fa fa-circle-o left-event" aria-hidden="true"><span class="text-primary">      ${e.doctors}/5</span></i> `,
                        start  : moment(e["_id"]["date"]).format(),
                        color : e["_id"]["period"] == "am"? "rgba(98, 208, 233, 0.3)": "rgba(255, 255, 0, 0.3)",
                        allDay: true,
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
                    var period = (data._id).period =="am" ? 'เช้า' : 'บ่าย';
                 
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
    }
    
}