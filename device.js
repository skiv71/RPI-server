var serial = require('serialport').SerialPort;

var device = function(obj) {

	console.log('creating new device ' + obj.port);

	var dev = new serial(obj.port, false);

	delete obj.port;

	for (var key in obj) {

		if (dev.options[key]) {

			console.log('setting option ' + key + ': ' + obj[key]);

			dev.options[key] = obj[key];

		} else {

			console.log('unknown option ' + key);

		}

	}

	return dev;

};

module.exports = {

	createNew: function(obj) {

		if (obj.port) {

			var dev = device(obj);
		
			return dev;

		} else {

			console.log('invalid parameters!');

		}

	} 

}