import { Component, AfterViewInit , OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../ModalComponent/modal.component';
import { DoctorDateElementService } from '../../services/doctor-date-element.service';
import { DiagnosisService } from '../../services/diagnosis.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
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
    selectedEvent : Object;

    schedule: Object[] = [];
    doctor: Object[] = [];

    constructor(private router: Router,private elementService: DoctorDateElementService , private diagnosisService : DiagnosisService,private notificationService: NotificationService){
        
    }
    ngOnInit(){
         jQuery('#stylehere').append("<style>" + require('./doctor-calendar.component.css')+"</style>");
          moment.locale('th');
    }
    ngAfterViewInit () {
        // this.fetchAndAdaptData();
        this.getData();
        

    }
    // fetchAndAdaptData(){
    //     this.elementService.getDoctorDateElements().then((jsonObject) => {
    //        jsonObject.table.forEach((e)=>{
    //         var img = e["_id"]["period"] == "am" ? `<img src="/resources/images/sun-rise.png" width="70%" style="float: left;" >` : `<img src="/resources/images/noon.png" width="70%" style="float: left;" >`;
    //             this.events.push(
    //                 {
    //                     title  : `<div class="col-sm-1 padd-right-unset"><div class="row">${img}</div><div class="row" style="padding-right:10px; color: #ff9800;"><i class="fa fa-stethoscope"  ></i></div></div><i class="fa left-event" aria-hidden="true"><span class="doc-num-left"> ${e.doctors}/5</span></i> <i class="fa pull-right right-event" aria-hidden="true"><span class="doc-num-left" style="color:rgb(217, 83, 79)"> ${e.patients}/15</span></i>`,
    //                     start  : moment(e["_id"]["date"]).format(),
    //                     allDay: true,
    //                     backgroundColor : "rgba(171,71,188,0)",
    //                     borderColor : e["_id"]["period"] == "am"? "rgba(113, 183, 85, 0.72)": "rgba(71, 164, 179, 0.58)",
    //                     // url : e,
    //                     id : e 
    //                 }
    //             );
               
    //        })
    //     }).then(() => {
    //         var self = this;
    //         jQuery('#calendar').fullCalendar({
    //             aspectRatio: 1.35 ,
    //             eventClick: function(calEvent, jsEvent, view) {
    //                 console.log(calEvent.id);
    //                 var data = calEvent.id
    //                 console.log('Event: ' + calEvent.title);
    //                 console.log('Event id : '+ calEvent.id);
    //                 console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
    //                 console.log('View: ' + view.name);
    //                 self.selectedEvent = calEvent;
    //                 console.log( moment(new Date(calEvent.start)).format("ll"));
    //                 console.log(moment.locale());
    //                 var period = data["_id"]["period"] == "am" ? 'เช้า' : 'บ่าย';
    //                 self.titleModal = "รายละเอียดของช่วง<span class='text-primary'>        "+ period +"       วันที่         "+ moment(new Date(calEvent.start)).format("ll")+"</span>";
    //                 self.modal1.modalOpen();
    //             },
    //             dayClick: function () {
    //             console.log('clicked');
                
    //             },
    //             events: this.events
    //         });
    //         $(window).on('resize', function () {
    //             console.log("resize")
    //             self.resizeData()
    //             $(".fc-prev-button").on("click", function(){ self.resizeData() });
    //             $(".fc-next-button").on("click", function(){ self.resizeData() });
    //         }).resize();

    //     });
        
    // }

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

    getData(){
        this.elementService.getDoctorDateElements().then((data) => {
             this.schedule = data["table"];
             this.doctor = data["thisdoctor"];
             this.schedule.forEach((e) => {
                //  console.log(e);
                 e["isOperate"] = false;
                this.doctor.forEach((d) => {
                    if(e["_id"]["date"] == d["date"] && e["_id"]["period"] == d["timePeriod"]){
                        e["isOperate"] = true;
                        var tmp_patient = [];
                        d["appointments"].forEach((p) => {
                            tmp_patient.push({
                                name : p["patient"]["name"]["title"]+" "+p["patient"]["name"]["fname"]+" "+p["patient"]["name"]["lname"],
                                reason : p["reason"],
                                status : p["status"]
                            });
                        });
                        e["patientsNameList"] = tmp_patient; 
                        // console.log(e);
                    }
                });
             });
             // find sort and insert between
        
            this.schedule.sort(this.compare);
            // add missing Date
                var tmp = [];
            
            var temp = {
                date: new Date(this.schedule[0]._id.date),
                period: this.schedule[0]._id.period
            };
            var new_list = [];
            console.log(temp);
            console.log("============");
            //console.log(this.incDate(temp));
            var map = {};
            console.log(temp);
            new_list.push({
                    _id: temp,
                    isOperate: this.schedule[0].isOperate,
                    patients: 0,
                    doctors: this.schedule[0].doctors,
                    patientsNameList: []
                });
            map[temp.date+temp.period] = true;
            console.log(new_list[0]._id);

            console.log(this.schedule);
            
            for(var i = 1; i < this.schedule.length ; i++){
                var dest = {
                    date: new Date(this.schedule[i]._id.date),
                    period: this.schedule[i]._id.period
                };
                while(temp.date < dest.date ||(!(temp.date > dest.date) && temp.period == 'am' && dest.period == 'pm')){
                    if(!map[temp.date+temp.period]){
                        new_list.push({
                            _id: {
                                'date': temp.date,
                                'period': temp.period
                            },
                            isOperate: false,
                            patients: 0,
                            doctors: 0,
                            patientsNameList: []
                        });
                        map[temp.date+temp.period] = true;
                    }
                    console.log("now >> ");
                    console.log(temp);
                    temp = this.incDate(temp.date, temp.period);
                }
                temp = {
                    date: new Date(this.schedule[i]._id.date),
                    period: this.schedule[i]._id.period
                };
                if(!map[temp.date+temp.period]){
                    new_list.push({
                        _id: dest,
                        isOperate: this.schedule[i].isOperate,
                        patients: 0,
                        doctors: this.schedule[i].doctors,
                        patientsNameList: []
                    });
                    map[temp.date+temp.period] = true;
                }
            }
            this.schedule = new_list;
            console.log(map);
            console.log(this.schedule);

            console.log("++++++++++++++++++");
           
            // ******************** map doctor to schedule**********************
            this.schedule.forEach((e) => {
                //  console.log(e);
                 e["isOperate"] = false;
                this.doctor.forEach((d) => {
                    // console.log();
                    if(moment(new Date(e["_id"]["date"])).isSame(moment(new Date(d["date"]))) && e["_id"]["period"] == d["timePeriod"] ){
                        e["isOperate"] = true;
                        var tmp_patient = [];
                        e["patients"] = d["appointments"].length;
                        d["appointments"].forEach((p) => {
                            tmp_patient.push({
                                name : p["patient"]["name"]["title"]+" "+p["patient"]["name"]["fname"]+" "+p["patient"]["name"]["lname"],
                                reason : p["reason"],
                                status : p["status"]
                            });
                        });
                        e["patientsNameList"] = tmp_patient; 
                        console.log("data");
                    }
                });
             });



            // ***************init calendar******************
            this.scheduleToEvents();
            this.initFullCalendar();


            var self = this;
            $(window).on('resize', function () {
                console.log("resize")
                self.resizeData()
                $(".fc-prev-button").on("click", function(){ self.resizeData() });
                $(".fc-next-button").on("click", function(){ self.resizeData() });
            }).resize();

               

        });
    }

    compare (a ,b){
        if(new Date(a['_id']['date'])>new Date(b['_id']['date'])) return 1;
        if(new Date(a['_id']['date'])<new Date(b['_id']['date'])) return -1;
        return (a['_id']['period'] == "am")? -1:1;
    }

    addDays(date,days)
    {
        var dat = new Date(date);
        dat.setDate(dat.getDate() + days);
        return dat;
    }

    incDate(date, period){
        if(period == "am") period = "pm";
        else{
            date = this.addDays(date,1);
            period = "am";
        }
        return {
            date: date,
            period: period
        }
    }

    addSchedule(){
        
        console.log(this.selectedEvent["_id"]["date"].toISOString().split("T")[0]);
            var oneItem = {
                "date": this.selectedEvent["_id"]["date"].toISOString().split("T")[0].concat('T00:00:00.000Z'),
                "timePeriod":this.selectedEvent["_id"]["period"],
                "doctor_fname": localStorage.getItem('user_fname'),
                "doctor_lname": localStorage.getItem('user_lname')
            }
                var self = this;
            this.diagnosisService.addSchedule(oneItem).then((data) => {
                    
                    if(data['msg']=='saved'){

                        console.log('called');
                        console.log(data);
                        // successs ok 
                        self.selectedEvent["isOperate"] = true;
                        self.modal1.modalClose();
                        // this.router.navigate(['manage','doctor_calendar']);
                      
                        this.router.navigate(['manage','landing']);
                        // document.getElementById("calendar").innerHTML ="";
                        // self.getData();
                        // self.initFullCalendar();
                        // this.ngOnInit();
                        //  self.scheduleToEvents();
                        //  jQuery('#calendar').fullCalendar( 'removeEvents' )
                        //  jQuery('#calendar').fullCalendar( 'removeEventSources');
                        //     jQuery('#calendar').fullCalendar( 'rerenderEvents' );
                        //  jQuery('#calendar').fullCalendar( 'refetchEvents' );
                        //  jQuery('#calendar').fullCalendar( 'addEventSource', self.events);         
                        //  jQuery('#calendar').fullCalendar( 'rerenderEvents' );
                        //  jQuery('#calendar').fullCalendar( 'refetchEvents' );
                        //  jQuery('#calendar').fullCalendar( 'refresh' )
                         self.resizeData();

                    }else{
                        // error
                        console.log(data);
                    }
                });
    }
    initFullCalendar(){
        console.log("init");
         var self = this;
            jQuery('#calendar').fullCalendar({
                aspectRatio: 1.35 ,
                eventClick: function(calEvent, jsEvent, view) {
                    console.log(calEvent.id);
                    var data = calEvent.id
                    // console.log('Event: ' + calEvent.title);
                    // console.log('Event id : '+ calEvent.id);
                    // console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
                    // console.log('View: ' + view.name);
                    self.selectedEvent = data;
                    self.isOperate = self.selectedEvent["isOperate"];
                    console.log(self.selectedEvent);
                    var period = data["_id"]["period"] == "am" ? 'เช้า' : 'บ่าย';
                    self.titleModal = "รายละเอียดของช่วง<span class='text-primary'>        "+ period +"       วันที่         "+ moment(new Date(calEvent.start)).format("ll")+"</span>";
                    self.modal1.modalOpen();
                },
                dayClick: function () {
                console.log('clicked');
                
                },
                events: this.events
            });
    }
    scheduleToEvents(){
            this.schedule.forEach((e) => {
                var img = e["_id"]["period"] == "pm" ? `<img src="/resources/images/sun-rise-1.png" width="70%" style="float: left;" >` : `<img src="/resources/images/anoon-1.png" width="70%" style="float: left;" >`;
                // console.log(e["doctors"]);
                var isDoctor = e["isOperate"] ? `<i class="fa fa-stethoscope"  ></i>` : '';
                this.events.push(
                    {
                        title  : `<div class="col-sm-1 padd-right-unset"><div class="row">${img}</div><div class="row" style="padding-right:10px; color: #ff9800;">${isDoctor}</div></div><i class="fa left-event" aria-hidden="true"><span class="doc-num-left"> ${e["doctors"]}/10</span></i> <i class="fa pull-right right-event" aria-hidden="true"><span class="doc-num-left" style="color:rgb(217, 83, 79)"> ${e["patients"]}/15</span></i>`,
                        start  : moment(e["_id"]["date"]).format(),
                        allDay: true,
                        backgroundColor : "rgba(171,71,188,0)",
                        borderColor : e["_id"]["period"] == "am"? "rgba(113, 183, 85, 0.72)": "rgba(71, 164, 179, 0.58)",
                        // url : e,
                        id : e 
                    }
                );

            });
    }
    doClick(){
        if(this.selectedEvent["isOperate"]){
            this.removeSchedule();
        }else{
            this.addSchedule();
        }
    }
     
    removeSchedule(){
        console.log("remove schedule() called");
        console.log(this.selectedEvent);
        this.elementService.searchSchedule(this.selectedEvent["_id"]["date"].toISOString().split("T")[0].concat('T00:00:00.000Z') ,this.selectedEvent["_id"]["period"] ).then((data) => {
            console.log("search");
            console.log(data);
            data["appointments"].forEach((e)=>{
                this.elementService.shift(e,data["date"]).then((result)=>{
                    console.log('----');
                    console.log(result);
                    
                    var hours = new Date(result.data['newDate']).getHours();
                    var hours = (hours+24-2)%24; 
                    var mid='am';
                    if(hours==0){ //At 00 hours we need to show 12 am
                        hours=12;
                    }
                    else if(hours>12){
                        hours=hours%12;
                        mid='pm';
                    }
                    if(result.status == "success"){
                        // send some noti
                        console.log("success");
                        console.log(e);
                        //-----TODO : KIN please fill these.------
                        var d_fname ='xxx';
                        var d_lname ='yyy';
                        var dep = 'zzz';
                        var oldDate = this.selectedEvent['_id']['date'];
                        oldDate = moment(new Date(oldDate)).format("ll")
                        var newDate = result.data['newDate'];
                        newDate = moment(new Date(newDate)).format("ll")
                        //----end of todo kinnch
                        this.notificationService.sendSMSDoctorCancelAppt(
                                result.data['patient']['tel'],
                                result.data['patient']['name']['fname'],
                                result.data['patient']['name']['lname'],
                                d_fname,
                                d_lname,
                                dep,
                                oldDate,
                                this.selectedEvent['_id']['period'],
                                newDate,
                                mid)
                            .then((data)=>{
                                console.log('sms sended');
                                console.log(data);
                            });

                        //email
                        this.notificationService.sendEmailDoctorCancelAppt(
                                result.data['patient']['email'],
                                result.data['patient']['name']['fname'],
                                result.data['patient']['name']['lname'],
                                d_fname,
                                d_lname,
                                dep,
                                oldDate,
                                this.selectedEvent['_id']['period'],
                                newDate,
                                mid)
                            .then((data)=>{
                                console.log('email sended');
                                console.log(data);
                            });
                        
                        console.log(result.data);
                    }else{
                        //send some noti
                        console.log("fail");
                         console.log(result.data);
                    }
                });
            });
            this.elementService.removeSchedule(data._id).then((data)=>{
                this.modal1.modalClose();
                this.router.navigate(['manage','landing']);
            });
        });
    }
    
}