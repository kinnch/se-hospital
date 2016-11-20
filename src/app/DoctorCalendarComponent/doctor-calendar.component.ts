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

    schedule: Object[] = [];
    doctor: Object[] = [];

    constructor(private elementService: DoctorDateElementService){
        
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
            //  var maxDate =moment(this.schedule[0]["_id"]["date"]);
            //  var minDate =moment(this.schedule[0]["_id"]["date"]);
            //  this.schedule.forEach((e) => {
            //      var tmp_date = moment(e["_id"]["date"]);
            //      if( maxDate.isBefore(tmp_date)  ){
            //          maxDate = tmp_date;
            //      }
            //      else if(minDate.isAfter(tmp_date)){
            //          minDate = tmp_date;
            //      }
            //  });
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

            console.log(temp);
            new_list.push({
                    _id: temp,
                    isOperate: this.schedule[0].isOperate,
                    patients: this.schedule[0].patients,
                    patientsNameList: this.schedule[0].patientsNameList
                });
            console.log(new_list[0]._id);
            
            var map = {};
            
            for(var i = 1; i < this.schedule.length ; i++){
                var dest = {
                    date: new Date(this.schedule[i]._id.date),
                    period: this.schedule[i]._id.period
                };
                while(temp.date < dest.date ||( temp.date == dest.date && temp.period == 'am' && dest.period == 'pm')){
                    if(!map[temp.date+temp.period]){
                        new_list.push({
                            _id: {
                                'date': temp.date,
                                'period': temp.period
                            },
                            isOperate: false,
                            patients: 0,
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
                        patients: this.schedule[i].patients,
                        patientsNameList: []
                    });
                    map[temp.date+temp.period] = true;
                }
            }
            this.schedule = new_list;
            console.log(this.schedule);

            console.log("++++++++++++++++++");
            // for(var i=0;i<new 
            

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
    
}