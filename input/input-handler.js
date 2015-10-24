/*
requires node-hid
*/

var 
    HID          = require('node-hid')
  , util         = require('util')
  , EventEmitter = require('events').EventEmitter
;

var messages = {
  'acc' : new Buffer([0x41, 0x43, 0x4b, 0x73, 0xe5, 0x0a]),
  'heartbeat' : new Buffer([0xa6, 0x91, 0xca, 0x45, 0x52]),
}

var ackedMessages = [0xd3, 0xd4, 0xd5, 0xd6, 0xdb, 0xdc];

var device;

/*
https://github.com/weewx/weewx/blob/master/util/udev/rules.d/wmr300.rules
# make the oregon scientific wmr300 connected via usb accessible to non-root
SUBSYSTEM=="usb", ATTRS{idVendor}=="0FDE", ATTRS{idProduct}=="CA08", MODE="0666"
*/

var InputHandler = function(options) {

    // we need to store the reference of `this` to `self`, so that we can use the current context in the setTimeout (or any callback) functions
    // using `this` in the setTimeout functions will refer to those funtions, not the InputHandler class
    var self = this;

    this.listDevices = function() {

      // Get a list of all HID devices in the system:
      var devices = HID.devices();
      console.log(devices);
    };

    this.testa = function() {
      self.emit('data', 'yes');
    };

    this.run = function() {

      //device = new HID.HID(1118, 64); // microsoft mouse...
      //device = new HID.HID(0x0FDE, 0xCA08); // wmr300?
      

      setInterval(sendHeartbeat, 1000 * 20);


      // read data from the device
      device.on("data", function(data) {
        //var event = parse(data);
        var offset = 1;
        if( ackedMessages.indexOf(data[0+offset]) !== -1 ) {
          // send acc to some messages
          var msg = messages.acc;
          msg[3] = data[0+offset];
          msg[4] = data[7+offset];

          device.write( msg );
        }
        console.log(data);
        self.emit('data', data);
      });
    
    }
    
};

// extend EventEmitter so we can emit events eg .on('data')
util.inherits(InputHandler, EventEmitter);

module.exports = InputHandler;


function sendHeartbeat() {
  device.write( msg );
}
