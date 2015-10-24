/*
requires python-shell
*/

var 
    PythonShell  = require('python-shell')
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

    };

    this.testa = function() {
      //self.emit('data', 'yes');

      var scriptPath =  'input/wmr300.py';
      //scriptPath =  'input/wmr300dummy.py';
      console.log('scriptPath', scriptPath);

      var pythonPath = 'python';

      var options = {
        pythonPath: pythonPath,
      };

      var pyshell = new PythonShell(scriptPath, options);

      pyshell.on('message', function (message) {
        // received a message sent from the Python script (a simple "print" statement)
        var json = JSON.parse(message);
        //console.log(json);
        self.emit('data', new Buffer(json) );
      });
/*
      PythonShell.run(scriptPath, function (err) {
        if (err) throw err;
        console.log('finished');
      });*/

    };

    this.run = function() {

      //setInterval(sendHeartbeat, 1000 * 20);
    
    }
    
};

// extend EventEmitter so we can emit events eg .on('data')
util.inherits(InputHandler, EventEmitter);

module.exports = InputHandler;


function sendHeartbeat() {
  device.write( msg );
}
