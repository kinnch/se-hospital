if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('../uploadedfiles/uploadStructure.xlsx');
/* DO SOMETHING WITH workbook HERE */
var sheet_name_list = workbook.SheetNames;
in_date = '';
in_period = '';
in_fname = '';
in_lname = '';
oneSchedule = {};
sheet_name_list.forEach(function(y) { /* iterate through sheets */
  var worksheet = workbook.Sheets[y];
  i=0;
  for (z in worksheet) {
    /* all keys that do not begin with "!" correspond to cell addresses */
    if(z[0] === '!') continue;
    //  console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
    if(i%4==0){
        in_date = worksheet[z].v;
    }
    else if(i%4==1){
        in_period = worksheet[z].v;
    }
    else if(i%4==2){
        in_fname = worksheet[z].v;
    }
    else if(i%4==3){
        in_lname = worksheet[z].v;
        oneSchedule = {
            "date": in_date,
            "period": in_period,
            "fname": in_fname,
            "lname": in_lname
        }
        console.log(oneSchedule);
    }
    i++;
  }
});