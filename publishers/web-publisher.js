var http = require('http');

var settings =    require('../config/settings')

var options = settings.web;

module.exports = {
  publish : function() { 

    if( settings.web.publish ) {
      console.log('web-publisher : do it (TBD)');


      /*
      http.get(options, function(resp){
        resp.on('data', function(chunk){
          //do something with chunk
        });
      }).on("error", function(e){
        console.log("Got error: " + e.message);
      });
      */

    }
  }
}
