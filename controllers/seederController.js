var dbConnection;

exports.setDBConnectionsFromApp = function(app) {

    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

var Drug = require("../model/drug");
var Disease = require("../model/disease");
var Patient = require("../model/patient");
var Department = require("../model/department");
var Diagnosis = require("../model/diagnosis");
var DrugPrescription = require("../model/drugPrescription");
var HospitalEmployee = require("../model/hospitalEmployee");
var PhysicalChecking = require("../model/physicalChecking");
var Schedule = require("../model/schedule");
var Appointment = require("../model/appointment");

var PrescriptionDrug  = require("../model/prescriptionDrug");

function getDateNow(){
    var this_date = new Date(new Date().getTime() + 7 * 3600 * 1000);
    this_date = new Date(this_date.getFullYear()+'-'+(this_date.getMonth() + 1)+"-"+this_date.getDate());
    return this_date;
}
function getDateYesterday(){
    var this_date = new Date(new Date().getTime() - 24 * 3600 * 1000 + 7 * 3600 * 1000);
    this_date = new Date(this_date.getFullYear()+'-'+(this_date.getMonth() + 1)+"-"+this_date.getDate());
    return this_date;
}


exports.seed = function(req, res) {
    //Drugs N=7
    var drugs = [
        new Drug({
            name: "paracetamol",
            hasInHospital:  true
        }),
        new Drug({
            name: "cpm",
            hasInHospital: true
        }),
        new Drug({
            name: "chemicalX",
            hasInHospital: false
        }),
        new Drug({
            name: "aspirin",
            hasInHospital: true
        }),
        new Drug({
            name: "colgate",
            hasInHospital: true
        }),
        new Drug({
            name: "listerline",
            hasInHospital: true
        }),
        new Drug({
            name: "ponstan",
            hasInHospital: true
        })
    ];

    //Diseases N=7
    //len(icd10) = 2-20 char
    var diseases = [
        new Disease({
            name: "วัดใหญ่",
            icd10: "H1N1"
        }),
        new Disease({
            name: "เบาหวาน",
            icd10: "DIA1"
        }),
        new Disease({
            name: "ความดันโลหิต",
            icd10: "PRES"
        }),
        new Disease({
            name: "รูมาตอยด์",
            icd10: "ROO1"
        }),
        new Disease({
            name: "คาวาซากิ",
            icd10: "KWAZ"
        }),
        new Disease({
            name: "ทรพิษ",
            icd10: "POIS134"
        }),
        new Disease({
            name: "พาร์กินสัน",
            icd10: "PAKS"
        })
    ];

    //Departments N=12
    var departments = [
        new Department({
            name: "อายุรกรรม"
        }),
        new Department({
            name: "ศัลยกรรม"
        }),
        new Department({
            name: "สูติ-นรีเวช"
        }),
        new Department({
            name: "จักษุ"
        }),
        new Department({
            name: "โรคผิวหนัง"
        }),
        new Department({
            name: "อวัยวะปัสสาวะ"
        }),
        new Department({
            name: "หัวใจ"
        }),
        new Department({
            name: "หู คอ จมูก"
        }),
        new Department({
            name: "รังสี"
        }),
        new Department({
            name: "รักษาโรคในช่องปากและฟัน"
        }),
        new Department({
            name: "กระดูก"
        }),
        new Department({
            name: "BOSS"
        })
    ];

    //Patients N=6
    var patients = [
        new Patient({
            name: {
                title: "นาย",
                fname: "กีรติ",
                lname: "ธนกิจเจริญพัฒน์"
            },
            email: "keerati.tan@gmail.com",
            tel: "0888983283",
            nationalID: '1103701553821',
            sex: "male",
            birthDate: new Date("1994-11-16"),
            HN: '12344321',
            salt: '471e91c751f97efdfa7e6df71a497dd739564a3db679c8ab1564f92368a23d29',
            address: {
                detail: "842 เสนาวิลล่า84 ถ.แฮบปี้แลนด์",
                subDistrict: "คลองจั่น",
                distict: "บางกะปิ",
                province: "กรุงเทพฯ",
                postCode: "10240"
            },
            OTP: {
                text: "931278",
                generatedDate: new Date()
            },
            allegicDrugs: [drugs[0]._id]
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "Somrak",
                lname: "Farang"
            },
            email: "eName.P@gmail.com",
            tel: "0899991010",
            nationalID: '31013300020937',
            sex: "male",
            birthDate: new Date("1994-08-06"),
            HN: '100001',
            salt: '471e91c751f97efdfa7e6df71a497dd739564a3db679c8ab1564f92368a23d29',
            address: {
                detail: "622/100 ม.พฤกษ์ภิรมย์",
                subDistrict: "แสมดำ",
                distict: "บางขุนเทียน",
                province: "กรุงเทพฯ",
                postCode: "10150"
            },
            OTP: {
                text: "092201",
                generatedDate: new Date()
            },
            allegicDrugs: [drugs[0], drugs[4]]
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "กรุงศรี",
                lname: "คนที่สอง"
            },
            email: "Krung_sri@hotmail.co.th",
            tel: "0890891111",
            nationalID: '1100100011231',
            sex: "male",
            birthDate: new Date("1994-08-06"),
            HN: '100005',
            salt: '471e91c751f97efdfa7e6df71a497dd739564a3db679c8ab1564f92368a23d29',
            address: {
                detail: "622/100 ม.พฤกษ์ภิรมย์",
                subDistrict: "คลองต้นไทร",
                distict: "คลองสาน",
                province: "กทม.",
                postCode: "10600"
            },
            OTP: {
                text: "111112",
                generatedDate: new Date()
            },
            allegicDrugs: [drugs[0], drugs[1], drugs[2]]
        }),
        new Patient({
            name: {
                title: "นางสาว",
                fname: "ลำดวล",
                lname: "คนที่สาม"
            },
            email: "R_a_k.Dee@jobtoshare.com",
            tel: "0890891112",
            nationalID: '4908921116081',
            sex: "female",
            birthDate: new Date("1960-01-02"),
            HN: '200009',
            salt: '471e91c751f97efdfa7e6df71a497dd739564a3db679c8ab1564f92368a23d29',
            address: {
                detail: "17/4 หมู่ 5 ถนนบำรุงราษฎร์",
                subDistrict: "พิบูลสงคราม",
                distict: "เมือง",
                province: "เชียงราย",
                postCode: "51000"
            },
            OTP: {
                text: "111112",
                generatedDate: new Date()
            },
            allegicDrugs: []
        }),
        new Patient({
            name: {
                title: "นาง",
                fname: "ลำดวล",
                lname: "คนที่สี่"
            },
            email: "",
            tel: "0818132200",
            nationalID: '0941327919461',
            sex: "female",
            birthDate: new Date("1911-02-28"),
            HN: '123321',
            salt: '471e91c751f97efdfa7e6df71a497dd739564a3db679c8ab1564f92368a23d29',
            address: {
                detail: "197 ถนนเจริญราษฎร์",
                subDistrict: "วัดเกต",
                distict: "เมืองเชียงใหม่",
                province: "เชียงใหม่",
                postCode: "50000"
            },
            OTP: {
                text: "002020",
                generatedDate: new Date()
            },
            allegicDrugs: []
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "Miracle",
                lname: "ธนกิจเจริญพัฒน์"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: '2749477015164',
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: '200000',
            salt: '471e91c751f97efdfa7e6df71a497dd739564a3db679c8ab1564f92368a23d29',
            address: {
                detail: "1873 ถนนพระราม 4 ",
                subDistrict: "ปทุมวัน",
                distict: "ปทุมวัน",
                province: "กรุงเทพมหานคร",
                postCode: "10330"
            },
            OTP: {
                text: "999999",
                generatedDate: new Date()
            },
            allegicDrugs: []
        })
    ];

    //HospitalEmployees N=4
    var hospitalEmployees = [
        new HospitalEmployee({
            name: {
                title: "นาย",
                fname: "หมาย",
                lname: "เป็นสตาฟ"
            },
            roleID: 1, //staff
            department: departments[10]._id,
            userName: "staffuser",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "นพ.",
                fname: "ผมคือหมอ",
                lname: "หมอโดยกำเนิด"
            },
            roleID: 2, //doctor
            department: departments[1]._id,
            userName: "doctoruser",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "นางสาว",
                fname: "ชลกานต์",
                lname: "พยาบาลโดยกำเนิด"
            },
            roleID: 3, //nurse
            department: departments[1]._id,
            userName: "nurseuser",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "นาง",
                fname: "ชมผกา",
                lname: "ยาดี"
            },
            roleID: 4, //phar
            department: departments[10]._id,
            userName: "pharmacistuser",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        })
    ];
    
    
    

    //Appointments N=9
    var appointments = [
        new Appointment({
            patient: patients[0]._id,
            reason: "หัวใจเต้นไม่เป็นจังหวะ ตุ้ม ๆ ต่อม ๆ",
            status: 4
        }),
        new Appointment({
            patient: patients[0]._id,
            reason: "ตัวร้อน ไข้สูง เจ็บคอ กลืนน้ำลายไม่ได้",
            status: 0
        }),
        new Appointment({
            patient: patients[1]._id,
            reason: "น้ำมูกไหลตอนกลางคืน",
            status: 3
        }),
        new Appointment({
            patient: patients[2]._id,
            reason: "หายใจไม่ออก",
            status: 0
        }),
        new Appointment({
            patient: patients[3]._id,
            reason: "เจ็บหน้าอกข้างซ้ายเป็นระยะ ๆ มา 2 เดือนแล้ว",
            status: 2
        }),
        new Appointment({
            patient: patients[4]._id,
            reason: "ก้างปลาตำคอ",
            status: 1
        }),
        new Appointment({
            patient: patients[5]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 4
        }),
        new Appointment({
            patient: patients[5]._id,
            reason: "ปวดกระดูก ตกบันได",
            status: 4
        }),
        new Appointment({
            patient: patients[2]._id,
            reason: "ปวดท้อง",
            status: 3
        })
    ];

    // Schedules  N=4
    var schedules = [
        new Schedule({
            timePeriod: 'am',
            date: getDateYesterday(),
            doctor: hospitalEmployees[1]._id,
            appointments: [appointments[0]._id, appointments[6]._id]
        }),
        new Schedule({
            timePeriod: 'pm',
            date: getDateYesterday(),
            doctor: hospitalEmployees[1]._id,
            appointments: []
        }),
        new Schedule({
            timePeriod: 'am',
            date: getDateNow(),
            doctor: hospitalEmployees[1]._id,
            appointments: [appointments[7]._id, appointments[2]._id, appointments[4]._id, appointments[5]._id, appointments[8]._id]
        }),
        new Schedule({
            timePeriod: 'pm',
            date: getDateNow(),
            doctor: hospitalEmployees[1]._id,
            appointments: [appointments[1]._id,appointments[3]._id]
        })
    ];

    // PhysicalChecking  N=6
    var checkings = [
        new PhysicalChecking({
            bloodPresure: {
                systolic: 122,
                diastolic: 82
            },
            heartRate: 82,
            date: getDateYesterday(),
            timePeriod: "am",
            weight: 59,
            height: 164,
            temp: 38.0,
            patient: patients[0]._id,
            nurse: hospitalEmployees[2]._id
        }),
        new PhysicalChecking({
            bloodPresure: {
                systolic: 110,
                diastolic: 90
            },
            heartRate: 82,
            date: getDateYesterday(),
            timePeriod: "am",
            weight: 50,
            height: 160,
            temp: 37.4,
            patient: patients[5]._id,
            nurse: hospitalEmployees[2]._id
        }),
        new PhysicalChecking({
            bloodPresure: {
                systolic: 112,
                diastolic: 94
            },
            heartRate: 85,
            date: getDateYesterday(),
            timePeriod: "pm",
            weight: 50,
            height: 160,
            temp: 37.2,
            patient: patients[5]._id,
            nurse: hospitalEmployees[2]._id
        }),
        new PhysicalChecking({
            bloodPresure: {
                systolic: 105,
                diastolic: 66
            },
            heartRate: 75,
            date: getDateNow(),
            timePeriod: "am",
            weight: 65,
            height: 169,
            temp: 38.0,
            patient: patients[3]._id,
            nurse: hospitalEmployees[2]._id
        }),
        new PhysicalChecking({
            bloodPresure: {
                systolic: 140,
                diastolic: 70
            },
            heartRate: 83,
            date: getDateNow(),
            timePeriod: "am",
            weight: 60,
            height: 164,
            temp: 38.9,
            patient: patients[1]._id,
            nurse: hospitalEmployees[2]._id
        }),
        new PhysicalChecking({
            bloodPresure: {
                systolic: 120,
                diastolic: 50
            },
            heartRate: 80,
            date: getDateNow(),
            timePeriod: "am",
            weight: 65,
            height: 150,
            temp: 38.9,
            patient: patients[1]._id,
            nurse: hospitalEmployees[2]._id
        })
    ];

    // PrescriptionDrugs N=6
    var prescriptionDrugs = [
        new PrescriptionDrug({
            drug: drugs[0]._id,
            detail: "1 เม็ด ทุก ๆ 6 ชั่วโมง เมื่อมีไข้ ",
            amount: 12
        }),
        new PrescriptionDrug({
            drug: drugs[2]._id,
            detail: "1 เม็ดทุกมื้อ ก่อนอาหาร เช้า เย็น",
            amount: 16
        }),
        new PrescriptionDrug({
            drug: drugs[3]._id,
            detail: "1 เม็ดทุกมื้อ หลังอาหาร เช้า เย็น",
            amount: 12
        }),
        new PrescriptionDrug({
            drug: drugs[4]._id,
            detail: "1 เม็ดทุกมื้อ หลังอาหาร เช้า เย็น",
            amount: 12
        }),
        new PrescriptionDrug({
            drug: drugs[1]._id,
            detail: "1 เม็ดทุกมื้อ หลังอาหาร เช้า กลางวัน เย็น",
            amount: 30
        }),
        new PrescriptionDrug({
            drug: drugs[6]._id,
            detail: "1 เม็ดทุกมื้อ หลังอาหาร เช้า กลางวัน เย็น",
            amount: 10
        })
    ];

    // DrugPrescriptions  N=4
    var drugPrescriptions = [
        new DrugPrescription({
            status: 3,
            inspectedBy: hospitalEmployees[3]._id,
            note: "",
            prescriptions: [prescriptionDrugs[0]._id, prescriptionDrugs[1]._id]
        }),
        new DrugPrescription({
            status: 3,
            inspectedBy: hospitalEmployees[3]._id,
            note: "",
            prescriptions: [prescriptionDrugs[2]._id]
        }),
        new DrugPrescription({
            status: 2, // pharmacist approved
            inspectedBy: hospitalEmployees[3]._id,
            note: "",
            prescriptions: [prescriptionDrugs[3]._id]
        }),
        new DrugPrescription({
            status: 0, // reject
            inspectedBy: hospitalEmployees[3]._id,
            note: "ผู้ป้วยแพ้ยาพาราเซตามอน",
            prescriptions: [prescriptionDrugs[4]._id]
        }),
        new DrugPrescription({
            status: 1, // doctor created
            inspectedBy: none,
            note: "ผู้ป้วยแพ้ยาพาราเซตามอน",
            prescriptions: [prescriptionDrugs[5]._id]
        })
    ];

    //var this_date = new Date();
    //this_date = new Date(this_date.getFullYear()+'-'+(this_date.getMonth() + 1)+"-"+this_date.getDate());
    console.log(getDateNow());

    // Diagnosises  N=4
    var diagnosises = [
        new Diagnosis({
            drugPrescription: drugPrescriptions[0]._id,
            patient: patients[0]._id,
            doctor: hospitalEmployees[1]._id,
            timePeriod: 'am',
            date: getDateYesterday(),
            detail: "ผู้ป่วยมีไข้มา 3 วันก่อนหน้านี้",
            disease: diseases[0]._id
        }),
        new Diagnosis({
            drugPrescription: drugPrescriptions[1]._id,
            patient: patients[5]._id,
            doctor: hospitalEmployees[1]._id,
            timePeriod: 'am',
            date: getDateYesterday(),
            detail: "ผู้ป่วยปัสสาวะมีน้ำตาลสูง",
            disease: diseases[1]._id
        }),
        new Diagnosis({
            drugPrescription: drugPrescriptions[2]._id,
            patient: patients[5]._id,
            doctor: hospitalEmployees[1]._id,
            timePeriod: 'am',
            date: getDateNow(),
            detail: "ผู้ป่วยปวดหัวไมเกรน เวียนศีรษะ",
            disease: diseases[2]._id
        }),
        new Diagnosis({
            drugPrescription: drugPrescriptions[3]._id,
            patient: patients[1]._id,
            doctor: hospitalEmployees[1]._id,
            timePeriod: 'am',
            date: getDateNow(),
            detail: "ผู้ป่วยปวดตัวมาก",
            disease: diseases[3]._id
        })
    ];

    Patient.remove({}, function(err) {
        if(err) console.log('ERROR - patient table');
        console.log('patient collection removed');
        for(var i = 0; i < patients.length; i++){
            patients[i].save();
        }
    });
    Drug.remove({}, function(err) { 
        console.log('drug collection removed');
        for(var i = 0 ; i <drugs.length ; i++){
            drugs[i].save();
        }
    });

    PrescriptionDrug.remove({}, function(err) { 
        console.log('PrescriptionDrug collection removed');
        for(var i = 0 ; i <prescriptionDrugs.length ; i++){
            prescriptionDrugs[i].save();
        }
    });
    Department.remove({}, function(err) { 
        console.log('department collection removed');
        for(var i = 0; i < departments.length; i++){
            departments[i].save();
        }
    });
    Diagnosis.remove({}, function(err) { 
        console.log('diagnosis collection removed');
        for(var i = 0; i < diagnosises.length; i++){
            diagnosises[i].save();
        }
    });
    DrugPrescription.remove({}, function(err) { 
        console.log('drugPrescription collection removed');
        for(var i = 0; i < drugPrescriptions.length; i++){
            drugPrescriptions[i].save();
        }
    });
    HospitalEmployee.remove({}, function(err) { 
        console.log('hospitalEmployee collection removed');
        for(var i = 0; i < hospitalEmployees.length; i++){
            hospitalEmployees[i].save();
        } 
    });
    PhysicalChecking.remove({}, function(err) { 
        console.log('physicalChecking collection removed');
        for(var i = 0; i < checkings.length; i++){
            checkings[i].save();
        }
    });
    Appointment.remove({}, function(err) { 
        console.log('Appointment collection removed');
        for(var i = 0; i < appointments.length; i++){
            appointments[i].save();
        }
        
    });
    Schedule.remove({}, function(err) { 
        console.log('schedule collection removed');
        for(var i = 0; i < schedules.length; i++){
            schedules[i].save();
        }
    });
    Disease.remove({}, function(err) { 
        console.log('schedule collection removed');
        for(var i = 0 ; i < diseases.length ; i++){
            diseases[i].save();
        }
    });
    res.send('Seeded');
}