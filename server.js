var debug;

var startServer = function(port,callback) {

	var net = require('net');

	var server = new net.Server();

	server.maxConnections = 1;
	
	server.listen(port);

	server.on('listening', function() {

		console.log('accepting connections on port ' + port);

		callback(server);

	});

};

var ipAddress = function(socket) {

	var addr = socket.remoteAddress;

	if (addr.indexOf(':') > -1) {

		var arr = addr.split(':');

		return arr[arr.length - 1];

	} else {

		return addr;

	}

};

var startListen = function(server,callback) {

	server.on('connection', function(socket) {

		console.log('new connection from ' + ipAddress(socket));

		callback(socket);

	});

};

var openDevice = function(device,callback) {

	console.log('opening device ' + device.path);

	device.open(function(err) {

		if (err)

			throw err;

		});

	device.on('open', function() {

		console.log('flushing port!');

		device.flush(function() {

			console.log('device ready!')

			callback();

		});

	});

}

var closeDevice = function(device) {

	console.log('closing device ' + device.path);

	device.close();

};

var print = function(text,data) {

	console.log(text + ': ' + data.toString('hex'));

};

var monitor = function(device,socket) {

	socket.on('data', function(data) {

		if (debug) {

			print('[dev<-tcp]',data);

		}

		device.write(data);

	});

	device.on('data', function(data) {

		if (debug)

			print('[dev->tcp]',data);

		socket.write(data);

	});

	socket.on('end', function() {

		closeDevice(device);

	});

};

module.exports = {

	start: function(obj) {

		var device = obj.device;

		var port = obj.port;

		if ((device) && (port)) {

			if (obj.debug)

				debug = obj.debug;

			startServer(obj.port, function(server) {

				startListen(server, function(socket) {

					openDevice(obj.device, function() {

						monitor(device,socket);

					});

				});

			});

		} else {

			console.log('invalid parameters!');

		}

	}

}