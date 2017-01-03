var IO = require('socket.io-client');
var Auth = require('./auth.service.js');
var socket = null;

export default {
	getSocketConnection() {
    if(localStorage.token){
      var self = this;
        // reset the socket
        // if it's not the first connect() call this will be triggered
      if( self.socket ) {
        //self.socket.disconnect();
        //delete self.socket;
        return self.socket;
      }else {
        // standard connectiong procedure
        self.socket = IO.connect({ // adapt to your server
          'transports': ['websocket', 'polling'],
          'query': 'token=' + localStorage.token,
          reconnection: true,             // default setting at present
          reconnectionDelay: 1000,        // default setting at present
          reconnectionDelayMax : 5000,    // default setting at present
          reconnectionAttempts: Infinity  // default setting at present
        });

        return self.socket;
      }
    }
	}
}