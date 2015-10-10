
var divInchToMM = 1/0.254;

module.exports = {

    spec : {
      211 : [ // temp
        { id: 'temp',               start:  8, div: 10 },
        { id: 'humidity',           start: 10, type: 'int8', div: 1 },
        { id: 'dewpoint',           start: 11, div: 1 },
        { id: 'heatIndex',          start: 13, div: 1 },
        { id: 'tempTrend',          start: 15, type: 'int8', div: 1 },
        { id: 'humidityTrend',      start: 16, type: 'int8', div: 1 },
        { id: 'maxDevpointDayDate', start: 17, type: 'date' },
        { id: 'maxDewpointDay',     start: 11, div: 10 },
        { id: 'minDevpointDayDate', start: 24, type: 'date' },
        { id: 'minDewpointDay',     start: 28, div: 10 },

        { id: 'minDevpointDayDate',   start: 24, type: 'date' },
        { id: 'minDewpointDay',       start: 28, div: 10 },
        { id: 'maxDevpointMonthDate', start: 31, type: 'date' },
        { id: 'maxDewpointMonth',     start: 36, div: 10 },
        { id: 'minDevpointIndexDate', start: 38, type: 'date' },
        { id: 'minDewpointIndexDay',  start: 43, div: 10 },
        { id: 'maxHeatIndexYearDate', start: 45, type: 'date' },
        { id: 'maxHeatIndexYear',     start: 50, div: 10 },
        { id: 'minHeatIndexYear',     start: 52, type: 'date' },
        { id: 'minHeatIndexYear',     start: 57, div: 10 }, 
      ],

      212 : [ // wind
        { id: 'gustspeed',          start:  8, div: 10 },
        { id: 'gustdirection',      start: 10, div:  1 },
        { id: 'avgspeed',           start: 12, div: 10 },
        { id: 'avgdir',             start: 14, div:  1 },

        { id: 'compassdir',         start: 16, div:  1 },
        { id: 'windchill',          start: 18, div: 10 },

        { id: 'gustTodayDate',      start: 20, type: 'date' },
        { id: 'gustToday',          start: 25, div: 10 },
        { id: 'gustTodayDirection', start: 27, div: 1 },

        { id: 'gustMonthDate',      start: 29, type: 'date' },
        { id: 'gustMonth',          start: 34, div: 10 },
        { id: 'gustMonthDirection', start: 36, div: 1 },

        { id: 'windChillTodayDate', start: 38, type: 'date' },
        { id: 'windChillToday',     start: 43, div: 10 },

        { id: 'windChillMonthDate', start: 45, type: 'date' },
        { id: 'windChillMonth',     start: 50, div: 10 },
      ],

      213 : [ // rain
        { id: 'rainHour',           start:  9, div: divInchToMM },
        { id: 'rainHour24',         start: 12, div: divInchToMM },
        { id: 'rainAccumulated',    start: 15, div: divInchToMM },
        { id: 'rainRate',           start: 17, div: 1 },
        { id: 'rainAccStartDate',   start: 19, type: 'date' },
        { id: 'rainMaxRateDate',    start: 24, type: 'date' },
        { id: 'rainRate24',         start: 29, div: 1 },
        { id: 'rainMaxRateMonthDate', start: 31, type: 'date' },
        { id: 'rainMaxRate',          start: 36, div: 1 },
      ],

      214 : [ // air
      ],
    }

};