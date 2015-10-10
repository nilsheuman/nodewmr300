var dummyData = require('./dummy-data').getDummyData();

var fakeTemp = 200;

module.exports = {
  fakeWindData : function() {
    var buf = dummyData[212 - 206];
    makeDate(buf);
    return buf;
  },

  fakeTempData : function() {
    var buf = dummyData[211 - 206];
    buf[9+1] = fakeTemp++;
    makeDate(buf);
    return buf;
  }
}



function makeDate(buf) {
  var date = new Date();

  var start = 3;
  buf[start++] = date.getFullYear()-2000;
  buf[start++] = date.getMonth()+1;
  buf[start++] = date.getDate();
  buf[start++] = date.getHours();
  buf[start++] = date.getMinutes();
}