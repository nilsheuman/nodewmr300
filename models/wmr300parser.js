
var spec;

module.exports = {
  setSpec : function(theSpec) {
    spec = theSpec;
  },
  parse : function(buffer) {
    return parse(buffer)
  },
}

/*
parses the buffer, requires setSpec to have been called
*/
function parse(buffer) {
  // when reading device with raw_data.py we got the buffer starting with a 0
  // but all specifications starts with the type as first byte, so we offset
  // with 1 step, for easier reading
  var offset = 1;
  var len = buffer[1+offset];

  var event =  {
    type: buffer[0+offset],
    length: len,
    date: dataToDate( buffer.slice(2+offset,7+offset) ),
    channel: buffer[7+offset],
    checksum: buffer[ len-1+offset ],
    raw: buffer.slice(offset, len-1+offset),
  }

  parseData(event);
    
  return event;
}

/*
grabs a date from 5 bytes, first byte is years from 2000
the rest is just month, day, hour, minute
*/
function dataToDate(buf) {
  //console.log('datebuf', buf);
  var date = {
    year: 2000+buf[0],
    month: buf[1],
    day: buf[2],
    hour: buf[3],
    minute: buf[4]
  };

  return date;
}

/*

  Checks the data with the current type, example on a spec below
    spec : {
      211 : [ // temp
        { id: 'temp',               start:  8, div: 10 },
      ]
    }

  start is the start byte
  div is if we need to divide the value (temperature is divided by 10 : 183 -> 18.3*C)
  type can be 
    int16 (default), 
    int8  (only one byte for data), 
    date  (five bytes that is parsed to a date)

  returns the event width added field data with parsed data
*/
function parseData(event) {
  if( spec[event.type] === undefined ) {
    console.log('unknown type', event.type);
    return event;
  }
  var good = {};
  for(var i = 0; i < spec[event.type].length; i++) {
    var item = spec[event.type][i];
    //console.log('i',i,item.id);
    if( item.div === undefined ) {
      item.div = 1;
      //console.log(item.id, 'div1');
    }
    if( item.type === undefined ) {
      // default int16
      item.type = 'int16';      
      //console.log(item.id, 'i16');
    }

    switch( item.type ) {
      case 'int8' :
        good[ item.id ] = event.raw[item.start] / item.div;
      break;
      case 'int16' :
        good[ item.id ] = event.raw.readInt16BE(item.start) / item.div;
      break;
      case 'date' :
        good[ item.id ] = dataToDate( event.raw.slice(item.start, item.start+5) );
      break;
      default : 
        good[ item.id ] = 'invalid type ' + item.type;
      break;
    } 
  }
  
  event.data = good;
  return event;
}