var dev = require('./device.js');

var device = dev.createNew({

	port: '/dev/ttyUSB0',

	baudRate: 38400

});

var server = require('./server.js');

server.start({

	device: device,

	port: 4331,

	debug: false

});