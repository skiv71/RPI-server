# RPI-server

I've written this to accompany the new BMSLink-nodejs code.

When run, this provides a virtual serial port via a locally run server (on the RPI), so that the main BMSLink can connect
to the serial port of your chosen device.

This has been tested with an RFXtrx433, but it should work almost all locally found, serial ports.

The main app.js is self explanatory.

First, create your device, by passing the port and optionally, baudrate (if you don't this will be 9600, as per 'serialport' package.

Second, start the server, passing the device from above and the port number you wish to listen on.

Will probably expand on this, so allow for an Angular based app, to visualise local ports and control them.
