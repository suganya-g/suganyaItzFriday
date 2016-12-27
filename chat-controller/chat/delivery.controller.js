var redis = require('redis');
const redisUrl = process.env.REDIS_URL || 'redis://localhost';

var client = redis.createClient(redisUrl);

var chatHistory = client.multi();

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
			chatHistory.exec(function(error, result){
				if(error)
				{
					console.log(error);
				}
				else
				{
					//console.log(result);
					client.llen(channel,function(err, res){
						if(err)
							console.log(err);
						else
						{
							if(res >= 50)
							{
								client.lrange(channel,0,res,function(err, res)
								{
									if(err)
										console.log(err);
									else
									{
										console.log(res);	
										//--------------->>>>
										// 	SAVE THE DATA IN THE DATABASE
										//--------------->>>>

										//in the callback method for saving data to mongo, call this expire
										client.expire(channel, 5, function(err, res)	//it will remove the data from the redis server
										{
											if(err)
												console.log(err);
											else
											{	
												console.log("set for expiration in 5 seconds");
											}
										});
									}
								});
							}
						}
					});
				}
			});
		});

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
