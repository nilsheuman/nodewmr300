/*

  flow:

    1. get data from device over usb, parse
    2. update datamodel with the data
    3. every x-minutes, publish the data over the selected protocol

*/

var 
    settings      = require('./config/settings')
  , filePublisher = require('./publishers/file-publisher')
  , webPublisher  = require('./publishers/web-publisher')
  , ftpPublisher  = require('./publishers/ftp-publisher')
  , dataHandler   = require('./models/data-handler')
  , dataModel     = require('./models/data-model')
  , debugData     = require('./models/debug-data')
  , InputHandler  = require('./input/input-handler-socket')
  , inputHandler  = new InputHandler();
;

//console.log('cur', dataModel.currentData );
// read saved data into datamodel
filePublisher.read(function(data) { 
  dataModel.currentData = data;
  console.log('loaded old data', dataModel.currentData);
});

inputHandler.on('data', function(buf) { newData(buf); } );
//inputHandler.listDevices();
//inputHandler.testa();
inputHandler.run();



// debug, fake data input
//setInterval(function() { newData(debugData.fakeWindData() ); }, 900); // org 2.5-3
//setInterval(function() { newData(debugData.fakeTempData() ); }, 500*1); // org 10-12


// this gets called when we get new data from the device
function newData(buf) {
  dataHandler.handle(buf);  
}


// setup publishing of the model
var publishModel = function() {
  
  if( dataHandler.isModelUpdated() ) {
    filePublisher.publish();
    webPublisher.publish();
    ftpPublisher.publish();
    dataHandler.setModelUpdated(false);
  }

}
setInterval(publishModel, 1000 * settings.publish.interval);
