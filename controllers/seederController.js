var dbConnection;

exports.setDBConnectionsFromApp = function(app) {

    console.log("users controller setDBConnectionFromApp Started");
    dbConnection = app.get("dbConnection");
}

var Drug = require("../model/drug");
var Drug2 = require("../model/drug2");
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

function getDateNextKday(k){
    var this_date = new Date(new Date().getTime() + k * 24 * 3600 * 1000 + 7 * 3600 * 1000);
    this_date = new Date(this_date.getFullYear()+'-'+(this_date.getMonth() + 1)+"-"+this_date.getDate());
    return this_date;
}


exports.seed = function(req, res) {
    //Drugs [0-10]
    var drugs = [
        new Drug({
            name: "Paracetamol 500mg. (เม็ด)",
            hasInHospital:  true
        }),
        new Drug({
            name: "Paracetamol 325mg. (เม็ด)",
            hasInHospital:  true
        }),
        new Drug({
            name: "Antacid (เม็ด)",
            hasInHospital: true
        }),
        new Drug({
            name: "chemicalX (เม็ด)",
            hasInHospital: true
        }),
         new Drug({
            name: "Antiseptic (เม็ด)",
            hasInHospital: true
        }),
        new Drug({
            name: "Aspirin (เม็ด)",
            hasInHospital: true
        }),
        new Drug({
            name: "Sleeping pills (เม็ด)",
            hasInHospital: true
        }),
        new Drug({
            name: "Laxative (เม็ด)",
            hasInHospital: true
        }),
        new Drug({
            name: "Ponstan (เม็ด)",
            hasInHospital: true
        }),
        new Drug({
            name: "Cough mixture 125ml.(ขวด)",
            hasInHospital: true
        }),
        new Drug({
            name: "Ear drops (หลอด)",
            hasInHospital: true
        })
        
    ];

    //[0-4]
    var drugs2 = [
        new Drug2({
            name: "Paracetamol",
        }),
        new Drug2({
            name: "chemicalX",
        }),
        new Drug2({
            name: "Aspirin",
        }),
        new Drug2({
            name: "Laxative",
        }),
        new Drug2({
            name: "Ponstan",
        })
    ];

    //Diseases [0-11]
    //len(icd10) = 2-20 char
    var diseases = [
        new Disease({
            name: "ไข้หวัดใหญ่",
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
        }),
         new Disease({
            name: "ปอดอักเสบ",
            icd10: "PNEU"
        }),
        new Disease({
            name: "แผลในกระเพาะอาหาร",
            icd10: "PEU1"
        }),
        new Disease({
            name: "กระเพาะปัสสาวะอักเสบ",
            icd10: "CYS1"
        }),
        new Disease({
            name: "ปอดอักเสบ",
            icd10: "PNEU"
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
        /*
        new Department({
            name: "BOSS"
        })
        */
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
            HN: 12344321,
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
            allegicDrugs: [drugs2[0]._id],
            bloodType: "A"
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
            HN: '10000111',
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
            allegicDrugs: [drugs2[0], drugs2[4]],
            bloodType: "O"

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
            HN: '10000512',
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
            allegicDrugs: [drugs2[0], drugs2[1], drugs2[2]],
            bloodType: "AB"

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
            HN: '20000913',
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
            allegicDrugs: [drugs2[0]._id],
            bloodType: "A"

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
            birthDate: new Date("1987-02-28"),
            HN: '12332114',
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
            allegicDrugs: [],
            bloodType: "A"


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
            HN: 11223344,
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
            allegicDrugs: [],
            bloodType: "A"

        }),
        // new patient 20.
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้01",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้02",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้03",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้04",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้05",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้06",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้07",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้08",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้09",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้10",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้11",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้12",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้13",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้14",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้15",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้16",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้17",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้18",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้19",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
        new Patient({
            name: {
                title: "นาย",
                fname: "คนไข้20",
                lname: "เป็นตัวปลอม"
            },
            email: "miracle@me.in.th",
            tel: "0818132200",
            nationalID: null,
            sex: "male",
            birthDate: new Date("1990-01-06"),
            HN: null,
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
            allegicDrugs: [],
            bloodType: "A"
        }),
    ];

    //HospitalEmployees
    //--- staff 0-3
            //0-1 อายุรกรรม departments[0]._id
            //2-3 หู คอ จมูก departments[7]._id
    //--- doctor 4-15
            //4-10 อายุรกรรม departments[0]._id
            //11-15 หู คอ จมูก departments[7]._id
    //--- nurse 16-17
            //16 อายุรกรรม departments[0]._id
            //17 อายุรกรรม departments[7]._id
    //--- pharmacist 18-19
            //18 อายุรกรรม departments[0]._id
            //19 อายุรกรรม departments[0]._id

    var hospitalEmployees = [
        new HospitalEmployee({
            name: {
                title: "นาย",
                fname: "หมาย",
                lname: "เป็นสตาฟ"
            },
            sex: 'male',
            roleID: 1, //staff
            department: departments[0]._id,
            userName: "staffuser1",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
         new HospitalEmployee({
            name: {
                title: "นางสาว",
                fname: "สยาม",
                lname: "เป็นสตาฟ"
            },
            sex: 'female',
            roleID: 1, //staff
            department: departments[0]._id,
            userName: "staffuser2",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "นาย",
                fname: "สหาย",
                lname: "เป็นสตาฟ"
            },
            sex: 'male',
            roleID: 1, //staff
            department: departments[7]._id,
            userName: "staffuser3",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
         new HospitalEmployee({
            name: {
                title: "นาง",
                fname: "กนก",
                lname: "เป็นสตาฟ"
            },
            sex: 'female',
            roleID: 1, //staff
            department: departments[7]._id,
            userName: "staffuser4",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "นพ.",
                fname: "ผมหมอหนึ่ง",
                lname: "อายุรกรรมหนึ่ง"
            },
            sex: 'male',
            roleID: 2, //doctor
            department: departments[0]._id,
            userName: "doctoruser1",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "นพ.",
                fname: "ผมหมอสอง",
                lname: "อายุรกรรมสอง"
            },
            sex: 'male',
            roleID: 2, //doctor
            department: departments[0]._id,
            userName: "doctoruser2",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "นพ.",
                fname: "ผมหมอสาม",
                lname: "อายุรกรรมสาม"
            },
            sex: 'male',
            roleID: 2, //doctor
            department: departments[0]._id,
            userName: "doctoruser3",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "นพ.",
                fname: "ผมหมอสี่",
                lname: "อายุรกรรมสี่"
            },
            sex: 'male',
            roleID: 2, //doctor
            department: departments[0]._id,
            userName: "doctoruser4",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "พญ.",
                fname: "เราหมอห้า",
                lname: "อายุรกรรมห้า"
            },
            sex: 'female',
            roleID: 2, //doctor
            department: departments[0]._id,
            userName: "doctoruser5",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "พญ.",
                fname: "เราหมอหก",
                lname: "อายุรกรรมหก"
            },
            sex: 'female',
            roleID: 2, //doctor
            department: departments[0]._id,
            userName: "doctoruser6",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "พญ.",
                fname: "เราหมอเจ็ด",
                lname: "อายุรกรรมเจ็ด"
            },
            sex: 'female',
            roleID: 2, //doctor
            department: departments[0]._id,
            userName: "doctoruser7",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "นพ.",
                fname: "เราหมอหนึ่ง",
                lname: "หูคอจมูกหนึ่ง"
            },
            sex: 'male',
            roleID: 2, //doctor
            department: departments[7]._id,
            userName: "doctoruser8",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "นพ.",
                fname: "เราหมอสอง",
                lname: "หูคอจมูกสอง"
            },
            sex: 'male',
            roleID: 2, //doctor
            department: departments[7]._id,
            userName: "doctoruser9",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "พญ.",
                fname: "เราหมอสาม",
                lname: "หูคอจมูกสาม"
            },
            sex: 'female',
            roleID: 2, //doctor
            department: departments[7]._id,
            userName: "doctoruser10",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "พญ.",
                fname: "เราหมอสี่",
                lname: "หูคอจมูกสี่"
            },
            sex: 'female',
            roleID: 2, //doctor
            department: departments[7]._id,
            userName: "doctoruser11",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "พญ.",
                fname: "เราหมอห้า",
                lname: "หูคอจมูกห้า"
            },
            sex: 'female',
            roleID: 2, //doctor
            department: departments[7]._id,
            userName: "doctoruser12",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "นางสาว",
                fname: "ชลกานต์",
                lname: "พยาบาลอายุกรรม"
            },
            roleID: 3, //nurse
            sex: 'female',
            department: departments[0]._id,
            userName: "nurseuser1",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "นางสาว",
                fname: "นลกานต์",
                lname: "พยาบาลหูคอจมูก"
            },
            roleID: 3, //nurse
            sex: 'female',
            department: departments[7]._id,
            userName: "nurseuser2",
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
            department: departments[0]._id,
            sex: 'female',
            userName: "pharmacistuser1",
            salt: "ca32c2542af60469091b9a9f9541aff16882dfa66a1dc69b6458422383f7b3a7",
            hash:"4585c2bb65725fff7c15d98a1107e3d2adc209d63c8819da6e5f7a09b9b5a948ba7112e85cd527cbbfaf7bda02d3d8fb0970cdeffe17bcee05b017810cfe645fc59f644c8228032f1a3b10312aab0c86dda750a7d174db26457d9ccac8138784ce079257ebdc95906d6ee651e77656f9a992e9d08c973e78eecee3187ed7ce1ba9106b521fe563400fda79e16e2e7bf5b37ad22f3fd612ff7f3b5b421eb8fa6b97460137a98bdaee5c31429e40e967db9a1774753784cfe29f3914fef4edb82792b451f72ac712a04f1f25ebef91cf6f9530ca63587fd0af7ff1214aca6a184bb5900cf292fce3b519314b37783d8894f6a5b81cfaef35530d56ab24ca7c55568d43d4fd03fb61f2cb734971c8b80729a6996a5799323d3552a9b436799b34aa757b69935a202e456954dac288d1106d661144c34e06ba15f976833521782bc5d839cc5af63e189ee92ec29c16b5b52d9f47e61baf6d64ee2cea6c03beacda0963c073a3cf6a9c03205cf4e50875128a64ff804fe63bb035a6a1d7951fb7e4599f7e2d65d4417c974362a1589e3547bbbbbacc95a2a7ecfed034be6c3eee702dd13da31837773b94db3cf29c72e291eb1cacb256c20c84ecf5402a2394a5424bb0f96f49099dabf4e605b394b6a207b94a2785739a6acc833b5208d05dda0d03e704cebc8e098bd02a12c091ccb408c93d4d3e0dd258b56c4033f74b2c88b4d0"
        }),
        new HospitalEmployee({
            name: {
                title: "นาง",
                fname: "ชมนาฏ",
                lname: "ยาดี"
            },
            roleID: 4, //phar
            department: departments[7]._id,
            sex: 'female',
            userName: "pharmacistuser2",
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
            status: 0
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
            status: 1
        }),
        new Appointment({
            patient: patients[5]._id,
            reason: "ปวดกระดูก ตกบันได",
            status: 0
        }),
        new Appointment({
            patient: patients[2]._id,
            reason: "ปวดท้อง",
            status: 2
        }),
        // and so on 15 in the same schedukle (which mean patient have to differrent in this slot)
        new Appointment({
            patient: patients[6]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[7]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[8]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[9]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[10]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[11]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[12]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[13]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[14]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[15]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[16]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[17]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[18]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[19]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[20]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        // and so on 20 in the same schedukle (which mean patient have to differrent in this slot)
        new Appointment({
            patient: patients[6]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[7]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[8]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[9]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[10]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[11]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[12]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[13]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[14]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[15]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[16]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[17]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[18]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[19]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[20]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[21]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[22]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[23]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[24]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
        new Appointment({
            patient: patients[25]._id,
            reason: "กินข้าวไม่ลง คลื่นไส้อาเจียร",
            status: 0
        }),
    ];

    // Schedules  N=4
    var schedules = [
        new Schedule({
            timePeriod: 'am',
            date: getDateYesterday(),
            doctor: hospitalEmployees[4]._id,
            appointments: [appointments[0]._id, appointments[6]._id]
        }),
        new Schedule({
            timePeriod: 'pm',
            date: getDateYesterday(),
            doctor: hospitalEmployees[4]._id,
            appointments: []
        }),
        new Schedule({
            timePeriod: 'am',
            date: getDateNow(),
            doctor: hospitalEmployees[4]._id,
            appointments: [
                appointments[7]._id,  
                appointments[4]._id, 
                appointments[5]._id, 
                appointments[8]._id
            ]
        }),
        
        //15 appointments
        new Schedule({
            timePeriod: 'am',
            date: getDateNow(),
            doctor: hospitalEmployees[5]._id,
            //fix it.
            appointments: [
                appointments[9]._id,  
                appointments[10]._id, 
                appointments[11]._id, 
                appointments[12]._id,
                appointments[13]._id, 
                appointments[14]._id, 
                appointments[15]._id,
                appointments[16]._id, 
                appointments[17]._id, 
                appointments[18]._id,
                appointments[19]._id, 
                appointments[20]._id,
                appointments[21]._id,
                appointments[22]._id, 
                appointments[23]._id,
            ]
        }),
        //appoitnments.length = 20
        new Schedule({
            timePeriod: 'pm',
            date: getDateNextKday(2),
            doctor: hospitalEmployees[5]._id,
            //fix it.
            appointments: [
                appointments[24]._id,  
                appointments[25]._id, 
                appointments[26]._id, 
                appointments[27]._id,
                appointments[28]._id, 
                appointments[29]._id, 
                appointments[30]._id,
                appointments[31]._id, 
                appointments[32]._id, 
                appointments[33]._id,
                appointments[34]._id, 
                appointments[35]._id,
                appointments[36]._id,
                appointments[37]._id, 
                appointments[38]._id,
                appointments[39]._id, 
                appointments[40]._id,
                appointments[41]._id,
                appointments[42]._id, 
                appointments[43]._id,
            ]
        }),
        new Schedule({
            timePeriod: 'pm',
            date: getDateNextKday(4),
            doctor: hospitalEmployees[12]._id,
            appointments: [appointments[1]._id]
        }),
        new Schedule({
            timePeriod: 'pm',
            date: getDateNextKday(8),
            doctor: hospitalEmployees[4]._id,
            appointments: [appointments[2]._id]
        }),
        new Schedule({
            timePeriod: 'am',
            date: getDateNextKday(7),
            doctor: hospitalEmployees[4]._id,
            appointments: [appointments[3]._id]
        }),
        new Schedule({
            timePeriod: 'am',
            date: getDateNextKday(16),
            doctor: hospitalEmployees[5]._id,
            appointments: []
        }),
        new Schedule({
            timePeriod: 'pm',
            date: getDateNow(),
            doctor: hospitalEmployees[4]._id,
            appointments: []
        }),
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
            nurse: hospitalEmployees[16]._id
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
            nurse: hospitalEmployees[16]._id
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
            patient: patients[4]._id,
            nurse: hospitalEmployees[16]._id
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
            nurse: hospitalEmployees[16]._id
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
            nurse: hospitalEmployees[16]._id
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
            patient: patients[2]._id,
            nurse: hospitalEmployees[16]._id
        }),
        new PhysicalChecking({
            bloodPresure: {
                systolic: 110,
                diastolic: 50
            },
            heartRate: 80,
            date: new Date(2015-12-12),
            timePeriod: "am",
            weight: 52,
            height: 155,
            temp: 37.7,
            patient: patients[4]._id,
            nurse: hospitalEmployees[16]._id
        }),
        new PhysicalChecking({
            bloodPresure: {
                systolic: 122,
                diastolic: 48
            },
            heartRate: 80,
            date: new Date(2016-02-11),
            timePeriod: "am",
            weight: 59,
            height: 155,
            temp: 38.0,
            patient: patients[4]._id,
            nurse: hospitalEmployees[16]._id
        }),
        new PhysicalChecking({
            bloodPresure: {
                systolic: 118,
                diastolic: 59
            },
            heartRate: 80,
            date: new Date(2016-09-19),
            timePeriod: "pm",
            weight: 64,
            height: 155,
            temp: 37.3,
            patient: patients[4]._id,
            nurse: hospitalEmployees[16]._id
        }),
        new PhysicalChecking({
            bloodPresure: {
                systolic: 125,
                diastolic: 57
            },
            heartRate: 70,
            date: new Date(2016-06-07),
            timePeriod: "am",
            weight: 77,
            height: 170,
            temp: 38.9,
            patient: patients[1]._id,
            nurse: hospitalEmployees[16]._id
        }),
        new PhysicalChecking({
            bloodPresure: {
                systolic: 129,
                diastolic: 54
            },
            heartRate: 84,
            date: new Date(2016-08-18),
            timePeriod: "am",
            weight: 75,
            height: 177,
            temp: 37.5,
            patient: patients[1]._id,
            nurse: hospitalEmployees[16]._id
        }),

    ];

    // PrescriptionDrugs [0-10]
    var prescriptionDrugs = [
        new PrescriptionDrug({
            drug: drugs[0]._id,
            detail: "1 เม็ด ทุก ๆ 6 ชั่วโมง เมื่อมีไข้ ",
            amount: 12
        }),
        new PrescriptionDrug({
            drug: drugs[2]._id,
            detail: "1 เม็ดทุก 4 ชั่วโมง",
            amount: 16
        }),
        new PrescriptionDrug({
            drug: drugs[1]._id,
            detail: "1 เม็ดเมือมีอาการปวด",
            amount: 12
        }),
        new PrescriptionDrug({
            drug: drugs[3]._id,
            detail: "1 เม็ด หลังอาหาร เช้า เย็น",
            amount: 12
        }),
        new PrescriptionDrug({
            drug: drugs[4]._id,
            detail: "1 เม็ด หลังอาหาร เช้า กลางวัน เย็น",
            amount: 10
        }),
        new PrescriptionDrug({
            drug: drugs[5]._id,
            detail: "1 เม็ด หลังอาหารเช้า",
            amount: 10
        }),
        new PrescriptionDrug({
            drug: drugs[6]._id,
            detail: "1 เม็ด ก่อนนอน",
            amount: 20
        }),
        new PrescriptionDrug({
            drug: drugs[7]._id,
            detail: "1 เม็ด ก่อนอาหาร เช้า",
            amount: 10
        }),
        new PrescriptionDrug({
            drug: drugs[8]._id,
            detail: "1 เม็ด หลังอาหารเช้า เย็น",
            amount: 10
        }),
        new PrescriptionDrug({
            drug: drugs[9]._id,
            detail: "1 ช้อนชาก่อนอาหาร เช้า เย็น",
            amount: 1
        }),
        new PrescriptionDrug({
            drug: drugs[10]._id,
            detail: "2-3 หยด ก่อนนอน",
            amount: 1
        })
    ];

    // DrugPrescriptions  N=9
    var drugPrescriptions = [
        new DrugPrescription({
            status: 1,
            inspectedBy: null,
            note: null,
            prescriptions: [prescriptionDrugs[0]._id, prescriptionDrugs[3]._id]
        }),
        new DrugPrescription({
            status: 1,
            inspectedBy: null,
            note: null,
            prescriptions: [prescriptionDrugs[2]._id, prescriptionDrugs[5]._id, prescriptionDrugs[8]._id]
        }),
        new DrugPrescription({
            status: 2, // pharmacist approved
            inspectedBy: null,
            note: null,
            prescriptions: [prescriptionDrugs[4]._id, prescriptionDrugs[9]._id]
        }),
        new DrugPrescription({
            status: 2, 
            inspectedBy: null,
            note: null,
            prescriptions: [prescriptionDrugs[1]._id, prescriptionDrugs[5]._id]
        }),
        new DrugPrescription({
            status: 3, // reject
            inspectedBy: hospitalEmployees[18]._id,
            note: "ผู้ป้วยแพ้ยาพาราเซตามอน",
            prescriptions: [prescriptionDrugs[2]._id]
        }),

        //old drugPres
        new DrugPrescription({
            status: 3,
            inspectedBy: null,
            note: null,
            prescriptions: [prescriptionDrugs[5]._id, prescriptionDrugs[1]._id, prescriptionDrugs[7]._id]
        }),
        new DrugPrescription({
            status: 3,
            inspectedBy: null,
            note: null,
            prescriptions: [prescriptionDrugs[4]._id, prescriptionDrugs[0]._id]
        }),
         new DrugPrescription({
            status: 3, 
            inspectedBy: null,
            note: null,
            prescriptions: [prescriptionDrugs[10]._id]
        }),
         new DrugPrescription({
            status: 3,
            inspectedBy: null,
            note: null,
            prescriptions: [prescriptionDrugs[8]._id, prescriptionDrugs[3]._id,prescriptionDrugs[0]._id,prescriptionDrugs[4]._id]
        }),
        new DrugPrescription({
            status: 3, 
            inspectedBy: null,
            note: null,
            prescriptions: [prescriptionDrugs[2]._id, prescriptionDrugs[6]._id]
        }),
        new DrugPrescription({
            status: 3, 
            inspectedBy: null,
            note: null,
            prescriptions: [prescriptionDrugs[9]._id]
        }),
        new DrugPrescription({
            status: 3, 
            inspectedBy: null,
            note: null,
            prescriptions: [prescriptionDrugs[0]._id, prescriptionDrugs[5]._id]
        }),
        
    ];

    //var this_date = new Date();
    //this_date = new Date(this_date.getFullYear()+'-'+(this_date.getMonth() + 1)+"-"+this_date.getDate());
    console.log(getDateNow());

    // Diagnosises  N=9
    var diagnosises = [
        new Diagnosis({
            drugPrescription: drugPrescriptions[8]._id,
            patient: patients[3]._id,
            doctor: hospitalEmployees[4]._id,
            timePeriod: 'pm',
            date: new Date("2016-06-25"),
            detail: "ผู้ป่วยมีอาการคลื่นไส้",
            disease: diseases[1]._id
        }),
        new Diagnosis({
            drugPrescription: drugPrescriptions[10]._id,
            patient: patients[3]._id,
            doctor: hospitalEmployees[4]._id,
            timePeriod: 'am',
            date: getDateYesterday(),
            detail: "ผู้ป่วยมีไข้มา 3 วันก่อนหน้านี้",
            disease: [diseases[9]._id, diseases[5]._id]
        }),
        new Diagnosis({
            drugPrescription: drugPrescriptions[1]._id,
            patient: patients[5]._id,
            doctor: hospitalEmployees[4]._id,
            timePeriod: 'am',
            date: getDateYesterday(),
            detail: "ผู้ป่วยปัสสาวะมีน้ำตาลสูง",
            disease: diseases[1]._id
        }),
        new Diagnosis({
            drugPrescription: drugPrescriptions[3]._id,
            patient: patients[5]._id,
            doctor: hospitalEmployees[4]._id,
            timePeriod: 'am',
            date: getDateNow(),
            detail: "ผู้ป่วยปวดหัวไมเกรน เวียนศีรษะ",
            disease: diseases[2]._id
        }),
        new Diagnosis({
            drugPrescription: drugPrescriptions[1]._id,
            patient: patients[1]._id,
            doctor: hospitalEmployees[4]._id,
            timePeriod: 'am',
            date: getDateNow(),
            detail: "ผู้ป่วยปวดตัวมาก",
            disease: diseases[6]._id
        }),
        new Diagnosis({
            drugPrescription: drugPrescriptions[2]._id,
            patient: patients[2]._id,
            doctor: hospitalEmployees[4]._id,
            timePeriod: 'am',
            date: getDateNow(),
            detail: "ผู้ป่วยมีอาการตัวร้อน ไขขึ้นสูง",
            disease: diseases[2]._id
        }),
        new Diagnosis({
            drugPrescription: drugPrescriptions[0]._id,
            patient: patients[3]._id,
            doctor: hospitalEmployees[4]._id,
            timePeriod: 'am',
            date: getDateNow(),
            detail: "ผู้ป่วยมีอาการคลื่นไส้ อาเจียน",
            disease: diseases[1]._id
        }),
        new Diagnosis({
            drugPrescription: drugPrescriptions[4]._id,
            patient: patients[4]._id,
            doctor: hospitalEmployees[4]._id,
            timePeriod: 'am',
            date: getDateNow(),
            detail: "ผู้ป่วยปวดหัวไมเกรน",
            disease: diseases[0]._id
        }),
        new Diagnosis({
            drugPrescription: drugPrescriptions[7]._id,
            patient: patients[3]._id,
            doctor: hospitalEmployees[4]._id,
            timePeriod: 'am',
            date: new Date("2016-10-19"),
            detail: "ผู้ป่วยมีไข้มา 3 วันก่อนหน้านี้",
            disease: [diseases[0]._id, diseases[4]._id, diseases[9]._id]
        }),
        new Diagnosis({
            drugPrescription: drugPrescriptions[5]._id,
            patient: patients[3]._id,
            doctor: hospitalEmployees[4]._id,
            timePeriod: 'am',
            date: new Date("2015-03-27"),
            detail: "ผู้ป่วยมีไข้มา 3 วันก่อนหน้านี้",
            disease: diseases[7]._id
        }),
        new Diagnosis({
            drugPrescription: drugPrescriptions[11]._id,
            patient: patients[1]._id,
            doctor: hospitalEmployees[4]._id,
            timePeriod: 'am',
            date: new Date("2016-07-24"),
            detail: "ปวดท้องรุนแรง ท้องบวม",
            disease: diseases[6]._id
        }),
        new Diagnosis({
            drugPrescription: drugPrescriptions[4]._id,
            patient: patients[1]._id,
            doctor: hospitalEmployees[4]._id,
            timePeriod: 'am',
            date: new Date("2015-11-18"),
            detail: "ผู้ป่วยมีไข้มา 3 วันก่อนหน้านี้",
            disease: [diseases[2]._id, diseases[3]._id]
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
        for(var i = 0 ; i < drugs.length ; i++){
            drugs[i].save();
        }
    });

    Drug2.remove({}, function(err) { 
        console.log('drug2 collection removed');
        for(var i = 0 ; i < drugs2.length ; i++){
            drugs2[i].save();
        }
    });

    PrescriptionDrug.remove({}, function(err) { 
        console.log('PrescriptionDrug collection removed');
        for(var i = 0 ; i < prescriptionDrugs.length ; i++){
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