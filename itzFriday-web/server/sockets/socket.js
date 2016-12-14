var redis = require('redis');
const redisUrl = process.env.REDIS_URL || 'redis://localhost';

var pub = redis.createClient(redisUrl);
var sub = redis.createClient(redisUrl);

module.exports = function (socket) {

	socket.on('user:join', function(joinedUser) {
    sub.subscribe(joinedUser.destination);
		socket.broadcast.emit('user:join', joinedUser);
	});
	// broadcast a user's message to other users
  	socket.on('send:message', function (data) {
      var chatToPublish = JSON.stringify({destination:data.destination, author: data.author, timeStamp:data.timeStamp, message:data.message});
  		pub.publish('delivery', chatToPublish);
  		sub.on('message', function(channel, message) {
        var chatData = JSON.parse(message);
        console.log('-------------------');
        console.log(message);
        console.log('-------------------');
  			socket.broadcast.emit('send:message', chatData);
  		});
  	});

  socket.on('notify', function (user) {
      socket.broadcast.emit('notify', user);
  });
}