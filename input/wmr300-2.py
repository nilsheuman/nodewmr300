## socket ##

from socket import *
import thread
import time

BUFF = 1024
HOST = '127.0.0.1'# must be input parameter @TODO
PORT = 9999 # must be input parameter @TODO
def response(key):
    return 'Server response: ' + key

currentSocket = -1

def handler(clientsock,addr):
    while 1:
        data = clientsock.recv(BUFF)
        if not data: break
        print repr(addr) + ' recv:' + repr(data)
        clientsock.send(response(data))
        print repr(addr) + ' sent:' + repr(response(data))
        if "close" == data.rstrip(): break # type 'close' on client console to close connection from the server side

    clientsock.close()
    print addr, "- closed connection" #log on console

def reader():
    global currentSocket
    while 1:
        time.sleep(1)
        print "hej"
        print currentSocket
        if( currentSocket != -1 ) :
            try :
              currentSocket.send("du")
            except :
              print "err"
              pass



## hid ##


## hid
from time import sleep
from msvcrt import kbhit

import pywinusb.hid as hid


def sample_handler(data):
    global currentSocket
    print("Raw data: {0}".format(data))
    #print( data )

    if( currentSocket != -1 ) :
        try :
            currentSocket.send("{0}".format(data))
        except :
          print "err"
          pass

def raw_test():
    # simple test
    # browse devices...
    #all_hids = hid.find_all_hid_devices()
    #device = all_hids[0]

    device = hid.HidDeviceFilter(vendor_id = 0x0FDE, product_id = 0xCA08).get_devices()[0]

    try:
        device.open()

        for report in device.find_output_reports():
            print report

        # get output handle
        out_report = device.find_output_reports()[0]

        #set custom raw data handler
        device.set_raw_data_handler(sample_handler)

        #print("\nWaiting for data...\nPress any (system keyboard) key to stop...")

        # ack
        #print("send ack\n")
        #cmd = [0x00]*65
        #cmd[0] = 0x41
        #cmd[1] = 0x43
        #cmd[2] = 0x4b
        #cmd[3] = 0x00
        #cmd[4] = 0x00
        #cmd[5] = 0x00
        #out_report.set_raw_data(cmd)
        #out_report.send()

        # heartbeat
        #print("send heartbeat\n")
        cmd = [0x00]*65
        cmd[0] = 0xa6
        cmd[1] = 0x91
        cmd[2] = 0xca
        cmd[3] = 0x45
        cmd[4] = 0x52
        cmd[5] = 0x01
        out_report.set_raw_data(cmd)
        out_report.send()

        # 72/73
        #print("send 72/73\n")
        cmd = [0x00]*65
        cmd[0] = 0x73
        cmd[1] = 0xe5
        cmd[2] = 0x0a
        cmd[3] = 0x26
        cmd[4] = 0x88
        cmd[5] = 0x8b
        out_report.set_raw_data(cmd)
        out_report.send()

        while not kbhit() and device.is_plugged():
            #just keep the device opened to receive events
            sleep(0.5)
        return
    finally:
        device.close()








if __name__=='__main__':

    #thread.start_new_thread(reader, ())
    import sys
    if sys.version_info >= (3,):
        # as is, don't handle unicodes
        unicode = str
        raw_input = input
    else:
        # allow to show encoded strings
        import codecs
        sys.stdout = codecs.getwriter('mbcs')(sys.stdout)
    thread.start_new_thread(raw_test, ())



    ADDR = (HOST, PORT)
    serversock = socket(AF_INET, SOCK_STREAM)
    serversock.setsockopt(SOL_SOCKET, SO_REUSEADDR, 1)
    serversock.bind(ADDR)
    serversock.listen(5)
    while 1:
        print 'waiting for connection... listening on port', PORT
        clientsock, addr = serversock.accept()
        currentSocket = clientsock
        print '...connected from:', addr
        thread.start_new_thread(handler, (clientsock, addr))




