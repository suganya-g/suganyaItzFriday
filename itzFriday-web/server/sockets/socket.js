var redis = require('redis');
const redisUrl = process.env.REDIS_URL || 'redis://localhost';

var pub = redis.createClient(redisUrl);
var sub = redis.createClient(redisUrl);


module.exports = function (socket) {

  sub.on("psubscribe", function(pattern, count) {
        console.log("Subscribed to channels of project" + pattern + ". Now subscribed to " + count + " channel(s).");
    });

	socket.on('user:join', function(project) {
    console.log("in user joined"+project);
    sub.psubscribe(project+"*"); 
    //socket.join(joinedUser.destination);
		//socket.broadcast.emit('user:join', joinedUser);
	});
	// broadcast a user's message to other users
  	socket.on('send:message', function (data) {
      var chatToPublish = JSON.stringify({
        method: 'send:message',
        destination:data.destination, 
        author: data.author, 
        timeStamp:data.timeStamp, 
        message:data.message
      });
  		pub.publish('delivery', chatToPublish);
  	});
      

  socket.on('notify', function (data) {
     var notifyUser = JSON.stringify({
        method: 'notify',
        destination:data.destination, 
        author: data.author, 
        timeStamp:'', 
        message:data.author+' is typing.....'
      });
      pub.publish('delivery', notifyUser);
  });

  sub.on('pmessage', function(pattern, channel, message) {
        var chatData = JSON.parse(message);
        socket.emit(chatData.method, chatData);
  });
}