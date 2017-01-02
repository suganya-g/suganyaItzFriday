var redis = require('redis');
const redisUrl = process.env.REDIS_URL || 'redis://localhost';
var client = redis.createClient(redisUrl);

//var msgs = ['msg1','msg2','msg3'];
var chatHistory = client.multi();

// //save the channel from which the message is coming in this variable
// var channel = 'c1';

// //save the received message in this variable
// var msg = "new msg";

var listOfChannels = {};

function pushChannelMessage(channel, message)
{
	if(channel.match(/\/Droid/i)) {
		console.log('Channel', channel);
		let newChannel = channel.split('/')[0];
		console.log('my new channel is ',newChannel);
		chatHistory.rpush(newChannel,message);
	} else {
		chatHistory.rpush(channel,message);
	}
	
	//execute
	chatHistory.exec(function(errExec, resExec)
	{
		console.log('inside exec');
		if(errExec)
		{
			console.log(errExec);
		}
		else
		{
			console.log("pushed data in "+channel+" at "+resExec);
		 	client.llen(channel, function(errLlen, resLlen)
			{
				if(errLlen)
					console.log(errLlen);
				else if(resLlen < 50)	//length is less than 50
				{
					listOfChannels[channel] = resLlen;
				}
				else 	//length >= 50
				{
					listOfChannels[channel] = resLlen;
					client.lrange(channel,0,resLlen, function(errLrange,resLrange) 	//fetch the messages
					{
						if(errLrange)
							console.log(errLrange);
						else
						{
							let messages = [];
							console.log(resLrange);
							for(let result in resLrange)
							{
								messages.push({sender:channel, message:resLrange[result]});
							}
							console.log(messages);
							//------------------>>>>>>>>>>>>>>
							// SAVE MESSAGES IN DATABASE
							//------------------>>>>>>>>>>>>>>
							//call client.expire in callback of saving in database
							client.expire(channel, 5, function(errExpire, resExpire)
							{
								if(errExpire)
									console.log(errExpire);
								else
								{
									console.log(resExpire);
									console.log(channel+" set to expire in 5s");
								}
							});
						}
					});
				}
			});
			listOfChannels[channel];
		}
	});
}

//pushChannelMessage(channel, msg);
module.exports = pushChannelMessage;