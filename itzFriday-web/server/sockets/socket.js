var redis = require('redis');
const redisUrl = process.env.REDIS_URL || 'redis://localhost';

var pub = redis.createClient(redisUrl);
var sub = redis.createClient(redisUrl);

var client = redis.createClient(redisUrl);

var chatHistory = client.multi();

module.exports = function (socket) {

  sub.on("psubscribe", function(pattern, count) {
        console.log("Subscribed to channels of project" + pattern + ". Now subscribed to " + count + " channel(s).");
    });

	socket.on('user:join', function(project) {
    sub.punsubscribe();
    console.log("in user joined"+project);
    sub.psubscribe(project+"*"); 
	});
  
	// broadcast a user's message to other users
  	socket.on('send:message', function (data) {
      var chatToPublish = JSON.stringify({
        method: 'send:message',
        destination:data.destination, 
        author: data.author,
        user: data.user,
        timeStamp:data.timeStamp, 
        message:data.message
      });
      if(data.destination.match(/@Droid\//)) {
        pub.publish(data.destination, chatToPublish);
      } else {
        pub.publish('delivery', chatToPublish);
      }
      chatHistory.rpush(data.destination,chatToPublish);
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
        if(chatData.author.match(/Droid/i)) {
          chatHistory.rpush(chatData.destination,message);
        }
        socket.emit(chatData.method, chatData);
  });

}