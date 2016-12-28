var redis = require('redis');
const redisUrl = process.env.REDIS_URL || 'redis://localhost';

var client = redis.createClient(redisUrl);


module.exports = function(destination, callback) {
	let msgArray = [];
	client.llen(destination, function(err, res){
		if(err)
			console.log(err);
		else
		{
			client.lrange(destination,0,res, function(err2, res2){
				for(let result in res2)
				{
					msgArray.push(JSON.parse(res2[result]));
				}
				callback(null, msgArray);
			});
		}
	})
}
