var redis = require('redis');
const redisUrl = process.env.REDIS_URL || 'redis://localhost';
var pushChannelMessage = require('./chat.history.js');


		 var sub = redis.createClient(redisUrl);
		 var pub = redis.createClient(redisUrl);

		sub.on("error", function (err) {
    		console.log("Error " + err);
		});
		pub.on("error", function (err) {
    		console.log("Error " + err);
		});

		sub.subscribe('delivery');

		sub.on('message', function(channel, message) {
			var data = JSON.parse(message);
			if(!data.method.match(/chat:count/)){
				if(data.destination.match(/@/)) {
					var splitDestination = data.destination.split('@');
					if(splitDestination[1]) {
						var splitNames = splitDestination[1].split('/');
						var newNames = getUpdatedDestination(splitNames[0].split(' ')[0], splitNames[1].split(' ')[0]);
						var newDestination = splitDestination[0]+ '@' + newNames[0]+ '/' + newNames[1];
						pushChannelMessage(newDestination, message);
					}
				} else {
					pushChannelMessage(data.destination, message);
				}
			}
			pub.publish(data.destination, message);

		});

		function getUpdatedDestination() {
			var op = Array.prototype.sort.call(arguments, myCustomSort);
			console.log(op);
			return op;
		}

		function myCustomSort(a, b) {
        	return (a.toLowerCase() > b.toLowerCase()) ? 1 : -1;
    	}
		/*this.unsubscribe = function() {
			this.sub.unsubscribe('send:message');
		};

		this.publish = function(message) {
			this.pub.publish('send:message', message);
		};

		this.destroyRedis = function() {
			if (this.sub !== null) this.sub.quit();
			if (this.pub !== null) this.pub.quit();
		};*/
