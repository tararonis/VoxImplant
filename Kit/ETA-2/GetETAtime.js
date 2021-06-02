const VoximplantKit = require('@voximplant/kit-functions-sdk').default;

module.exports = async function (context, callback) {
     var kit = new VoximplantKit(context)

     var months = {
          'Jan': '01',
          'Feb': '02',
          'Mar': '03',
          'Apr': '04',
          'May': '05',
          'Jun': '06',
          'Jul': '07',
          'Aug': '08',
          'Sep': '09',
          'Oct': '10',
          'Nov': '11',
          'Dec': '12'
     }

     // get actual time of appointment
     var appoitment_month = kit.getVariable('month');   
     console.log(appoitment_month);
     console.log(typeof(appoitment_month));

     appoitment_month = Number(months[appoitment_month])
     var appoitment_day = Number(kit.getVariable('day'));
     var appoitment_hour = Number(kit.getVariable('hour'));

     console.log(appoitment_month, appoitment_day, appoitment_hour)

     // get current date time
    var today = new Date();
    var hour = Number(today.getHours()) + 3; // +3 - Moscow timezone
    
    var date = today.toISOString().split('T')[0];
    var month = date.split('-')[1];
    var day = Number(date.split('-')[2]);

     console.log(hour, month, day )

     var response = "";
     var count_of_hours = -1
     // compare variables and create response variable
     if (appoitment_month >= month && appoitment_day >= day && appoitment_hour >= hour) {
          count_of_hours = (appoitment_day - day) * 24 + (appoitment_hour - hour);
     }
     if (count_of_hours == 0 || count_of_hours == 1) {
          response = "IN THE NEAREST HOUR";
     }
     if (count_of_hours == -1){
          response = "THE APPOINTMENT HAS BEEN EXPIRED";
     }
     if (count_of_hours > 1){
         response = "IN THE " + String(count_of_hours) +" HOURS";
     }

     kit.setVariable('response', response);

     callback(200, kit.getResponseBody())
}