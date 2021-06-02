const VoximplantKit = require('@voximplant/kit-functions-sdk').default;
const sheetdb = require("sheetdb-node");
module.exports = async function (context, callback) {
    var kit = new VoximplantKit(context)

    
    const client = sheetdb({ address: '4iaa0qv05swm8' });

    // startIndex is taking from Kit environment.
    console.log("HERE!!!")
    var startIndex = kit.getVariable('search_id');
    console.log(startIndex)
    //var startIndex = 0

    // Get all rows where column id > then startIndex
    await client.read({ search: { id: ">" + String(startIndex), isFree: "TRUE" } }).then(function (data) {
        var freeSlots = JSON.parse(data)
        if (freeSlots[0] == null || freeSlots[1] == null) {
            throw "###ERR Don't have free slots";
        }
        a = String(freeSlots[0]['month']);
        b = String(freeSlots[0]['day']);
        c = String(freeSlots[0]['hour']);
        d = String(freeSlots[0]['id']);
        console.log(a, b, c, d)
        console.log(typeof (a))

        kit.setVariable('slot1_month', a);
        kit.setVariable('slot1_day', b);
        kit.setVariable('slot1_hour', c);
        kit.setVariable('slot1_id', d);

        w = String(freeSlots[1]['month']);
        x = String(freeSlots[1]['day']);
        y = String(freeSlots[1]['hour']);
        z = String(freeSlots[1]['id']);

        kit.setVariable('slot2_month', w);
        kit.setVariable('slot2_day', x);
        kit.setVariable('slot2_hour', y);
        kit.setVariable('slot2_id', z);

        kit.setVariable('startIndex', String(freeSlots[1]['id']));

        console.log(kit.getResponseBody())
    }, function (err) {
        console.log(err);
    });

    callback(200, kit.getResponseBody())
}