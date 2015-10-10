var JSFtp = require("jsftp");

var settings =    require('../config/settings')

var options = settings.ftp;
var ftp = new JSFtp(options);

module.exports = {
  publish : function() { 

    if( settings.ftp.publish ) {
      console.log('ftp-publisher : do it');

      var localFilePath = settings.file.path + settings.file.file;
      var remoteFilePath = settings.ftp.path + settings.ftp.file;

      ftp.put(localFilePath, remoteFilePath, function(hadError) {
        if (!hadError) {
          console.log('Ftp success');
        } else {
          console.log('Ftp fail', hadError);
        }
      });

    }
  }
}
