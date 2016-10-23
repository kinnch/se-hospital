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

exports.seed = function(req, res) {
    var para = new Drug({
            name: "paracetamol",
            hasInHospital:  true
    });

    var h1n1 = new Disease({
            name: "วัดใหญ่",
            icd10: "H1N1"
    });

    var departments = [];
    departments.push(new Department({
            name: "อายุรกรรม"
    }));
    departments.push(new Department({
            name: "ศัลยกรรม"
    }));
    departments.push(new Department({
            name: "สูติ-นรีเวช"
    }));
    departments.push(new Department({
            name: "จักษุ"
    }));
    departments.push(new Department({
            name: "โรคผิวหนัง"
    }));
    departments.push(new Department({
            name: "อวัยวะปัสสาวะ"
    }));
    departments.push(new Department({
            name: "หัวใจ"
    }));
    departments.push(new Department({
            name: "หู คอ จมูก"
    }));
    departments.push(new Department({
            name: "รังสี"
    }));
    departments.push(new Department({
            name: "รักษาโรคในช่องปากและฟัน"
    }));
    departments.push(new Department({
            name: "กระดูก"
    }));
    departments.push(new Department({
            name: "BOSS"
    }));

    var patients = [];
    patients.push(new Patient({
        name: {
            title: "นาย",
            fname: "กีรติ",
            lname: "ธนกิจเจริญพัฒน์"
        },
        tel: "0888983283",
        nationalID: '1103701553821',
        sex: "male",
        birthDate: new Date("1994-11-16"),
        HN: "12344321",
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
        allegicDrugs: [para._id]
    }));

    var hospitalEmployees = [];
    hospitalEmployees.push(new HospitalEmployee({
        name: {
            title: "นาย",
            fname: "หมาย",
            lname: "เป็นสตาฟ"
        },
        roleID: 1, //staff
        department: departments[10]._id
    }));
    hospitalEmployees.push(new HospitalEmployee({
        name: {
            title: "นพ.",
            fname: "สมชาย",
            lname: "กลายเป็นหมอศัลย์"
        },
        roleID: 2, //staff
        department: departments[1]._id,
        userName: "somchai555",
        password: "$2a$06$W.V7LCN5i9lREvGEHip4jeCF.E8FpuEd3gKMAIcX9to6CGq1XrgHO" //bcrypt('hello')
    }));
    hospitalEmployees.push(new HospitalEmployee({
        name: {
            title: "นางสาว",
            fname: "ชลกานต์",
            lname: "พยาบาลโดยกำเนิด"
        },
        roleID: 3, //staff
        department: departments[1]._id,
        userName: "chonlakarnSexy",
        password: "$2a$06$W.V7LCN5i9lREvGEHip4jeCF.E8FpuEd3gKMAIcX9to6CGq1XrgHO" //bcrypt('hello')
    }));
    hospitalEmployees.push(new HospitalEmployee({
        name: {
            title: "นาง",
            fname: "ชมผกา",
            lname: "ยาดี"
        },
        roleID: 4, //staff
        department: departments[10]._id,
        userName: "chomphaka",
        password: "$2a$06$W.V7LCN5i9lREvGEHip4jeCF.E8FpuEd3gKMAIcX9to6CGq1XrgHO" //bcrypt('hello')
    }));

    var schedules = [];
    schedules.push(new Schedule({
        timePeriod: 'am',
        date: new Date(),
        doctor: hospitalEmployees[1]._id,
        appointments: [{
            patient: patients[0]._id,
            reason: "ตัวร้อน ไข้สูง เจ็บคอ กลืนน้ำลายไม่ได้"
        }]
    }));
    schedules.push(new Schedule({
        timePeriod: 'ยม',
        date: new Date(),
        doctor: hospitalEmployees[1]._id,
        appointments: []
    }));

    var checkings = [];
    checkings.push(new PhysicalChecking({
        bloodPresure: {
            systolic: 120,
            diastolic: 80
        },
        heartRate: 83,
        weight: 60,
        height: 164,
        temp: 38.9,
        patient: patients[0]._id,
        nurse: hospitalEmployees[2]._id
    }));

    var drugPrescriptions = [];
    drugPrescriptions.push(new DrugPrescription({
        status: 0, //reject
        inspectedBy: hospitalEmployees[3]._id,
        note: "ผู้ป้วยแพ้ยาพารา",
        prescription: [{
            drug: para._id,
            detail: "1 เม็ดทุกมื้อ หลังอาหาร เช้า กลางวัน เย็น",
            amount: 30
        }]
    }));

    var diagnosises = [];
    diagnosises.push(new Diagnosis({
        drugPrescription: drugPrescriptions[0]._id,
        patient: patients[0]._id,
        doctor: hospitalEmployees[1]._id,
        timePeriod: 'am',
        date: new Date(),
        detail: "ทอนซิล บวมใหญ่ แดง แอสไปรอลปกติ มีหนอง",
        disease: h1n1._id
    }));

    Patient.remove({}, function(err) { 
        console.log('patient collection removed');
        for(var i = 0; i < patients.length; i++){
            patients[i].save();
        }
    });
    Drug.remove({}, function(err) { 
        console.log('drug collection removed');
        para.save();
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
    Schedule.remove({}, function(err) { 
        console.log('schedule collection removed');
        for(var i = 0; i < schedules.length; i++){
            schedules[i].save();
        }
    });
    Disease.remove({}, function(err) { 
        console.log('schedule collection removed');
        h1n1.save(); 
    });
    res.send('Seeded');
}