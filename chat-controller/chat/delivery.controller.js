var redis = require('redis');
const redisUrl = process.env.REDIS_URL || 'redis://localhost';

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
			pub.publish(data.destination, message);
		})

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
