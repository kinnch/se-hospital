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
    schedule: Object[] = [];
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
        // this.fetchAndAdaptData();
        this.getData();

    }
    fetchAndAdaptData(){
        this.elementService.getDoctorDateElements().then((jsonObject) => {
           jsonObject.table.forEach((e)=>{
            var color =e["_id"]["period"] == "am" ? "rgba(113, 183, 85, 0.72)" : "rgba(71, 164, 179, 0.58)" ;
            var pic =  e["_id"]["period"] == "am" ? `<img src="/resources/images/sun-rise.png" height="85%" style="float: left;" > <i class="fa fa-user-md" aria-hidden="true" style="color: rgba(113, 183, 85, 0.72);"></i>` : `<img src="/resources/images/noon.png" height="85%" style="float: left;" ><i class="fa fa-user-md" style="color:rgba(71, 164, 179, 0.58);" aria-hidden="true"></i>`;
                this.events.push(
                    {
                        title  : `${pic} <i class="fa left-event" aria-hidden="true"><span class="doc-num" style="color :${color};" >      ${e.doctors}/5</span></i>
                        <progress class="progress progress-info custom-progress" style=" margin-top: 8px;" value="50" max="100"></progress>
                        
                         `,
                        start  : moment(e["_id"]["date"]).format(),
                        backgroundColor : "rgba(171,71,188,0)",
                        borderColor : e["_id"]["period"] == "am"? "rgba(113, 183, 85, 0.72)": "rgba(71, 164, 179, 0.58)",
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
                    $(".fc-today-button").on("click", function(){ $(window).resize(); self.resizeData() });
                           
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
    getData(){
        var tmp=[];
        
        this.elementService.getStaffElements().then((data) => {
            data["table"].forEach((e) => {
                if(!this.isAinB(tmp , e)){
                    tmp.push({
                        timePeriod : e["timePeriod"],
                        date : e["date"],
                        doctors : [e["doctor"]]
                    });
                }else{
                    for(var i=0;i< tmp.length ;i++){
                            if(tmp[i]["timePeriod"] == e["timePeriod"] && moment ( new Date(tmp[i]["date"]) ).isSame( moment(new Date(e["date"])))){
                                tmp[i]["doctors"].push(e['doctor']);
                            }
                    }
                }
            });


            this.schedule = tmp;
            //sort
            this.schedule.sort(this.compare);
            // console.log(this.schedule);
            // add missing Date
             var temp = {
                date: new Date(this.schedule[0].date),
                timePeriod: this.schedule[0].timePeriod
            };
            var new_list = [];
            // console.log(temp);
            console.log("============");
            var map = {};
            // console.log(temp);
            new_list.push({
                    date: new Date(this.schedule[0].date),
                    timePeriod: this.schedule[0].timePeriod,
                    doctors : [this.schedule[0]["doctor"]]
                });
            map[temp.date+temp.timePeriod] = true;
            console.log(new_list[0]);

            console.log(this.schedule);
            
            for(var i = 1; i < this.schedule.length ; i++){
                var dest = {
                    date: new Date(this.schedule[i].date),
                    timePeriod: this.schedule[i].timePeriod
                };
                while(temp.date < dest.date ||(!(temp.date > dest.date) && temp.timePeriod == 'am' && dest.timePeriod == 'pm')){
                    if(!map[temp.date+temp.timePeriod]){
                        new_list.push({
                          'date': temp.date,
                          'timePeriod': temp.timePeriod,
                           doctors : []
                        });
                        map[temp.date+temp.timePeriod] = true;
                    }
                    console.log("now >> ");
                    console.log(temp);
                    temp = this.incDate(temp.date, temp.timePeriod);
                }
                temp = {
                    date: new Date(this.schedule[i].date),
                    timePeriod: this.schedule[i].timePeriod
                };
                if(!map[temp.date+temp.timePeriod]){
                    new_list.push({
                        date : dest.date,
                        timePeriod : dest.timePeriod,
                        doctors: this.schedule[i].doctors
                    });
                    map[temp.date+temp.timePeriod] = true;
                }
            }
            this.schedule = new_list;
            console.log(map);
            console.log(this.schedule);

            console.log("++++++++++++++++++");
            this.scheduleToEvents();
            this.initFullCalendar();
        });
    }
    isAinB(B,A){
        for(var i=0; i < B.length; i++ ){
            if(B[i]["timePeriod"] == A["timePeriod"] && moment ( new Date(B[i]["date"]) ).isSame( moment(new Date(A["date"])))){
                return true;
            }
        }
        return false;
    }
     compare (a ,b){
        if(new Date(a['date'])>new Date(b['date'])) return 1;
        if(new Date(a['date'])<new Date(b['date'])) return -1;
        return (a['timePeriod'] == "am")? -1:1;
    }
    incDate(date, timePeriod){
        if(timePeriod == "am") timePeriod = "pm";
        else{
            date = this.addDays(date,1);
            timePeriod = "am";
        }
        return {
            date: date,
            timePeriod: timePeriod
        }
    }
    addDays(date,days)
    {
        var dat = new Date(date);
        dat.setDate(dat.getDate() + days);
        return dat;
    }
    scheduleToEvents(){
            this.schedule.forEach((e) => {
                // var img = e["timePeriod"] == "pm" ? `<img src="/resources/images/sun-rise-1.png" width="70%" style="float: left;" >` : `<img src="/resources/images/anoon-1.png" width="70%" style="float: left;" >`;
                // // console.log(e["doctors"]);
                // var isDoctor = e["isOperate"] ? `<i class="fa fa-stethoscope"  ></i>` : '';
                // this.events.push(
                //     {
                //         title  : `<div class="col-sm-1 padd-right-unset"><div class="row">${img}</div><div class="row" style="padding-right:10px; color: #ff9800;">${isDoctor}</div></div><i class="fa left-event" aria-hidden="true"><span class="doc-num-left"> ${e["doctors"]}/10</span></i> <i class="fa pull-right right-event" aria-hidden="true"><span class="doc-num-left" style="color:rgb(217, 83, 79)"> ${e["patients"]}/15</span></i>`,
                //         start  : moment(e["_id"]["date"]).format(),
                //         allDay: true,
                //         backgroundColor : "rgba(171,71,188,0)",
                //         borderColor : e["_id"]["period"] == "am"? "rgba(113, 183, 85, 0.72)": "rgba(71, 164, 179, 0.58)",
                //         // url : e,
                //         id : e 
                //     }
                // );
                var color =e["timePeriod"] == "am" ? "rgba(113, 183, 85, 0.72)" : "rgba(71, 164, 179, 0.58)" ;
                var pic =  e["timePeriod"] == "am" ? `<img src="/resources/images/sun-rise.png" height="85%" style="float: left;" > <i class="fa fa-user-md" aria-hidden="true" style="color: rgba(113, 183, 85, 0.72);"></i>` : `<img src="/resources/images/noon.png" height="85%" style="float: left;" ><i class="fa fa-user-md" style="color:rgba(71, 164, 179, 0.58);" aria-hidden="true"></i>`;
                var p_text = ""
                if(e['doctors'].length < 2) p_text = "danger";
                else  if(e['doctors'].length <= 5) p_text = "warning";
                else  if(e['doctors'].length <= 7) p_text = "info";
                else  p_text = "success";
                this.events.push(
                    {
                        title  : `${pic} <i class="fa left-event" aria-hidden="true"><span class="doc-num" style="color :${color};" >      ${e['doctors'].length}/10</span></i>
                        <progress class="progress progress-${p_text} custom-progress" style=" margin-top: 8px;" value="${e['doctors'].length}" max="10"></progress>
                        
                         `,
                        start  : moment(e["date"]).format(),
                        backgroundColor : "rgba(171,71,188,0)",
                        borderColor : e["timePeriod"] == "am"? "rgba(113, 183, 85, 0.72)": "rgba(71, 164, 179, 0.58)",
                        allDay: true,
                        // url : e,
                        id : e 
                    }
                );

            });
    }
     initFullCalendar(){
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
                    self.selectedEvent = data;
                    console.log( moment(new Date(calEvent.start)).format("ll"));
                    console.log(moment.locale());
                    var period = data.timePeriod =="am" ? 'เช้า' : 'บ่าย';
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
                    $(".fc-today-button").on("click", function(){ $(window).resize(); self.resizeData() });
                           
                }
                
            }).resize();
             self.resizeData()
            $(window).resize();
     }
     removeDoctor(x){
         console.log("removing Doctor");
         
     }
    
}