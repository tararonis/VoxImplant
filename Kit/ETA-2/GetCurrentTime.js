const VoximplantKit = require('@voximplant/kit-functions-sdk').default;

module.exports = async function(context, callback) {
     var kit = new VoximplantKit(context)
     var today = new Date();    

     var hours = String(Number(today.getHours()) + 3);
     var dd = String(today.getDate()).padStart(2, '0')

     kit.setVariable('cur_hour',hours);
     kit.setVariable('cur_day', dd );

    callback(200, kit.getResponseBody())
}