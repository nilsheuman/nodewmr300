/*
  reads steering wheel from usb and submits mapped keys over mqtt

  requirements:
    npm install node-hid
    npm install mqtt
*/

/*
var HID       = require('node-hid')
//,   mqtt      = require('mqtt');

// Get a list of all HID devices in the system:
var devices = HID.devices()
console.log(devices)
var device = new HID.HID(1103, 46701);

// read data from the device
device.on("data", function(data) {
  var event = parse(data);
});
*/



var spec = require('./models/wmr300spec').spec;
var parser = require('./models/wmr300parser');
var dummyData = require('./models/wmr300dummydata').getDummyData();
parser.setSpec(spec);

//console.log('dummyData', dummyData);

var buf = dummyData[211 - 206];

var event = parser.parse(buf);

console.log(event);


