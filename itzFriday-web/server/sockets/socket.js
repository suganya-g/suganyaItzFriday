var redis = require('redis');
var getHistory = require('./history.data.js');
const redisUrl = process.env.REDIS_URL || 'redis://localhost';

var pub = redis.createClient(redisUrl);
var sub = redis.createClient(redisUrl);


module.exports = function (socket) {

  sub.on("psubscribe", function(pattern, count) {
        console.log("Subscribed to channels of project" + pattern + ". Now subscribed to " + count + " channel(s).");
    });

  sub.on('pmessage', function(pattern, channel, message) {
        var chatData = JSON.parse(message);
        socket.emit(chatData.method, chatData);
  });

	socket.on('user:join', function(project) {
    sub.punsubscribe();
    console.log("in user joined"+project);
    sub.psubscribe(project+"*"); 
	});

  socket.on('init:data', function(destination) {
    var chatData = getHistory(destination, function(err,res){
      if(err)
        console.log(err);
      else
      {
        console.log(res);
        socket.emit('init:data', res); 
      }
    });
  });
  
  socket.on('chat:count', function(countData) {
    var countToPublish = JSON.stringify({
        method: 'chat:count',
        destination:countData.destination,
        sender: countData.sender
      });
    pub.publish('delivery', countToPublish);
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
  	});

}