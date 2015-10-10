var fs = require('fs');

var settings =    require('../config/settings')
  , dataModel =    require('../models/data-model')

module.exports = {
  publish : function() { 
    if( settings.file.publish ) {
      var file = settings.file.path + settings.file.file;
      var text = JSON.stringify(dataModel.currentData);

      // decide if we append or overwrite the file
      var writeFunc = fs.writeFile;
      if( settings.file.append ) {
        writeFunc = fs.appendFile;
      }
      
      writeFunc(file, text+"\n", function(err) {
          if(err) {
              return console.log(err);
          }
          //console.log("Wrote to file: " + file + " text: " + text);
      });
    }
  }
}
