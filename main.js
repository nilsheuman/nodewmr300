/*

  flow:

    1. get data from device over usb, parse
    2. update datamodel with the data
    3. every x-minutes, publish the data over the selected protocol

*/

var   
    settings =      require('./config/settings')
  , filePublisher = require('./publishers/file-publisher')
  , webPublisher =  require('./publishers/web-publisher')
  , ftpPublisher =  require('./publishers/ftp-publisher')
;

var dataHandler = require('./models/data-handler');
var debugData = require('./models/debug-data');

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



// debug, fake data input
setInterval(function() { newData(debugData.fakeWindData() ); }, 900); // org 2.5-3
setInterval(function() { newData(debugData.fakeTempData() ); }, 500*1); // org 10-12


// this gets called when we get new data from the device
function newData(buf) {
  dataHandler.handle(buf);  
}


// setup publishing of the model
var publishModel = function() {
  
  if( dataHandler.isModelUpdated() ) {
    filePublisher.publish();
    webPublisher.publish();
    dataHandler.setModelUpdated(false);
  }

}
setInterval(publishModel, 1000 * settings.publish.interval);
