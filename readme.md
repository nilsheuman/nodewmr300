# Node WMR300

Reading raw data from Oregon Scientifict WMR300 over usb

Status: Experimental

## Installing

  NodeJS is required

  To install required packages run

    npm install

## Running

    node main.js

## Configuration

  Edit 

    settings.json

# Thanks

After a lot of googling some information about the protocol showed up, big thanks to these guys for doing all the hard work decoding and documenting the protocol!

## Node WMR300 is heavily based on this

  http://bsweather.myworkbook.de/oregon-wmr300-usb-protocol/

        0xD3 211 packages contain temperature, humidity and dewpoint data, with a length of 0x3D
        0xD4 212 packages contain wind data, with a length of 0x36 54
        0xD5 213 packages contain rain data, with a length of 0x28 40
        0xD6 214 packages contain air pressure data, with a length of 0x2E 46

    D3 package: temperature, humidity and dewpoint
    Bytes
    0   1   2 to 6    7               8 9                 10            11  12
    D3  3D  Y-m-d H:i 0 =in, 1 = out  temperature*10 [°C] humidity [%]  dewpoint*10 [°C]

    D4 package: wind average, gusts and directions
    Bytes
    0   1   2 to 6    7               8 9                 10  11        12  13              14  15
    D4  36  Y-m-d H:i 0 =in, 1 = out  gust speed*10 [m/s] gust dir [°]  avg speed*10 [m/s]  avg dir[°]

    D5 package: rain rate, sums and total rain
    Bytes
    0   1   2 to 6    7               8   9 10              11  12  13            14  15  16                    17  18
    D5  28  Y-m-d H:i 0 =in, 1 = out  ??  rain 1h*100 [in]  ??  rain 24h*100 [in] ??  rain since reset*100 [in] rain rate*100 [in/h]

    D6 package: air pressure and height
    Bytes
    0   1   2 to 6    7               8   9             10  11
    D6  2E  Y-m-d H:i 0 =in, 1 = out  pressure*10 [mb]  pressure at sea level*10 [mb]


## Node WMR300 is also heavily based on this

  python script

  https://groups.google.com/forum/#!topic/weewx-development/2zEbZ_h_Two

  google for ```wmr300 py``` 

  https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&ved=0CCMQFjABahUKEwjh8abmqrfIAhXEXiwKHU9xBXg&url=https%3A%2F%2Fgroups.google.com%2Fgroup%2Fweewx-development%2Fattach%2Faaf47cc992ae7%2Fwmr300-0.6.py%3Fpart%3D0.1&usg=AFQjCNGR8Cu95nvZpqb1ov-JO2dh4Jnfpg&sig2=V3sjDex5RUyxhMav0UXSNw&bvm=bv.104819420,d.bGg&cad=rja