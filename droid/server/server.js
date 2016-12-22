var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    compression = require('compression');
var main     = express();
var server = require('http').createServer(main);
var port = process.env.PORT || 3030;
var appConst = require('./config/config.js');
var db = require('./service/db.config.js');
var receiveMessage = require('./../redis/GitBotSubscriber.js');
var redis = require("redis");
var gitRouter = require("./routes/git/git.router.js");

const redisUrl = process.env.REDIS_URL || 'redis://localhost';

var gitBotSubscriber = redis.createClient(redisUrl);

main.use(compression());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

//Mongo connection
var appDB = db.getDBConnection();
appDB.on('error', console.error.bind(console, 'connection error:'));
appDB.once('open', function() {
    console.log("connnected with mongo");
});

gitBotSubscriber.psubscribe("*[@#]Droid/*");

gitBotSubscriber.on("pmessage", receiveMessage);

main.use('/api/v1/gitbot/',gitRouter);

// allow CORS
main.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});


server.listen(port, function() {
    console.log('Express server listening on port '+ server.address().port)
});