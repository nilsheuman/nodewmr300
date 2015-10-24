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

var socketDataCallback = function(data) { console.log('tbd') };

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
      

    };

    this.run = function() {


      socketDataCallback = function(data) {
        self.emit('data',data);
      };

      setupSocket();
      
      //setInterval(sendHeartbeat, 1000 * 20);
    
    }
    
};

// extend EventEmitter so we can emit events eg .on('data')
util.inherits(InputHandler, EventEmitter);

module.exports = InputHandler;


function sendHeartbeat() {
  device.write( msg );
}










// socket connection
var net   = require('net');

var socketIsConnected = false;
var socketClient = new net.Socket();

var SOCKET_PORT = 9999;

var setupSocket = function() {

  // to avoid that connect listeners never dies we create a new object for the connection
  // and hope they will die and not just stay silent...

  socketClient = new net.Socket();
  //socketClient.setMaxListeners(2);

  socketClient.on('data', function(data) {
    console.log('Socket Received: ' + data);
    socketMessageReceived(data);
  });

  socketClient.on('error', function() {
    console.log('Socket Connection error');
    socketIsConnected = false;
  });

  socketClient.on('close', function() {
    console.log('Socket Connection closed');
    socketIsConnected = false;

    socketClient.destroy();

    reSetupSocket();
  });

  // connect
  if( socketIsConnected ) {
    console.log('Socket already connected');
    return;
  }
  socketClient.connect(SOCKET_PORT, '127.0.0.1', function() {
  //socketClient.connect(SOCKET_PORT, '192.168.5.61, function() {
    console.log('Socket Connected');
    socketIsConnected = true;
  });

};

//setupAdbForward();

function socketMessageReceived(data) {
  //socketDataCallback(data);
  try{
    var json = JSON.parse(data);
    //console.log(json);
    socketDataCallback( new Buffer(json) );
  } catch(e) {
      console.log('failed parsing data, TBD...',data);
  }
}

function reSetupSocket() {
  //setupAdbForward();
  setTimeout(function() { setupSocket() }, 10000);
}