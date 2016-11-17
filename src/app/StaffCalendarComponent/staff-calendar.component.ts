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
    isFirst : boolean = true;
    issues=[
        {
            "key":1,
            "value" : 2,
            "text" : "นาย แพทย์ แปดสาวน้อย"
        },
        {
            "key":2,
            "value" : 3,
            "text" : "นาง แพทย์ แปดสาวน้อย2"
        },
        {
            "key":3,
            "value" : 3,
            "text" : "นาง แพทย์ แปดสาวน้อย2"
        },
        
        {
            "key":4,
            "value" : 3,
            "text" : "นาง แพทย์ แปดสาวน้อย2"
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
            var pic =  e["_id"]["period"] == "am" ? `<img src="/resources/images/sun-rise.png" height="85%" style="float: left;" >` : `<img src="/resources/images/noon.png" height="85%" style="float: left;" >`;
                this.events.push(
                    {
                        title  : `${pic}<i class="fa fa-user-md left-event" aria-hidden="true"><span >      ${e.doctors}/5</span></i>
                        <progress class="progress progress-info custom-progress" style=" margin-top: 8px;" value="50" max="100"></progress>
                        
                         `,
                        start  : moment(e["_id"]["date"]).format(),
                        color : e["_id"]["period"] == "am"? "rgba(171,71,188,1)": "rgb(88, 171, 39)",
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
                // self.resizeData()
                if(self.isFirst){
                    self.isFirst = false;
                    $(".fc-prev-button").on("click", function(){ $(window).resize(); self.resizeData() });
                    $(".fc-next-button").on("click", function(){ $(window).resize(); self.resizeData() });       
                }
                
            }).resize();
             self.resizeData()
            $(window).resize();
           
        });
        
    }

    callback(){
        alert("callback from modal");
    }

    resizeData(){
        $('.fc-content').height( $('.fc-content').width()*0.350);
        $('.left-event').css('margin-top',$('.fc-content').height()*0.4);
        $('progress').css('margin-top',$('.fc-content').height()*0.3);
        
    }
    
}