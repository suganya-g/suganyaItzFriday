var IO = require('socket.io-client');
var Auth = require('./auth.service.js');
var socket;

export default {
	getSocketConnection() {
		if((IO.sockets === undefined || IO.sockets === null) && localStorage.token) {
			console.log("new socket connection created!!");
			socket = IO.connect({'transports': ['websocket', 'polling'], 'query': 'token=' + localStorage.token});
			return socket;
		}else {
			return socket;
		}
	}
}