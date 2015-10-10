


var currentData = {
  updateTime: {
    year: 2015,
    month: 10,
    day: 10,
    hour: 18,
    minute: 10
  },
  wind : {
    gustspeed: 0,
    gustdirection: 0,
    avgspeed: 0,
    avgdir: 0,
    gustspeedHour : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    avgspeedHour : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    avgdirHour : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    gustspeedMinute : [0,0,0,0,0,0],
    avgspeedMinute : [0,0,0,0,0,0],
    avgdirMinute : [0,0,0,0,0,0],
  },
  temp : {
    temp : 0,
    tempHour : [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    tempMinute : [0,0,0,0,0,0],
  },
  rain : {
    hour: 0,
    hour24: 0,
    //rainHour : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
    //rainMin : [0,10,20,30,40,50],
  }
};


module.exports = {
  currentData : currentData
}