var
    dataModel =     require('./data-model')
  , spec =          require('./spec').spec
  , parser =        require('./parser')
  ;

parser.setSpec(spec);


var modelIsUpdated = false;

module.exports = {
  setModelUpdated : function(value) {
    modelIsUpdated = value;
  },

  isModelUpdated : function() {
    return modelIsUpdated;
  },

  handle : function(buf) {
    // every update get placed in its hour and minute bucket for a simple
    // recap of the last 24h, hours: 0,1,2..23, minutes: 0,10,20...50
    var date = new Date();
    var hour = date.getHours();
    var minute = Math.round( date.getMinutes()/10 );

    // parse the basic package structure to find event.type
    var event = parser.parse(buf);
    console.log('newData', 'type', event.type, 'hour', hour, 'minute', minute);

    // depending on event type, update the corresponding fields in the model
    // also update the history fields for each hour/minute with 
    switch( event.type ) {
      case 211 : // temp
        dataModel.currentData.updateTime = event.date;
        dataModel.currentData.temp.temp = event.data.temp;

        dataModel.currentData.temp.tempHour[hour] = event.data.temp;
        dataModel.currentData.temp.tempMinute[minute] = event.data.temp;
      break;
      case 212 : // wind
        dataModel.currentData.updateTime = event.date;
        dataModel.currentData.wind.gustspeed = event.data.gustspeed;
        dataModel.currentData.wind.gustdirection = event.data.gustdirection;
        dataModel.currentData.wind.avgspeed = event.data.avgspeed;
        dataModel.currentData.wind.avgdir = event.data.avgdir;

        dataModel.currentData.wind.gustspeedHour[hour] = event.data.gustspeed;
        dataModel.currentData.wind.avgspeedHour[hour] = event.data.avgspeed;
        dataModel.currentData.wind.avgdirHour[hour] = event.data.avgdir;
        dataModel.currentData.wind.gustspeedMinute[minute] = event.data.gustspeed;
        dataModel.currentData.wind.avgspeedMinute[minute] = event.data.avgspeed;
        dataModel.currentData.wind.avgdirMinute[minute] = event.data.avgdir;
      break;
      default : 
        console.log('newData unknown event.type', event.type);
      break;
    }

    modelIsUpdated = true;
  },
  
}


