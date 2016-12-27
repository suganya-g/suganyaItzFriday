var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    compression = require('compression');
var main     = express();
var server = require('http').createServer(main);
var port = process.env.PORT || 3333;
var chatRouter = require('./routes/chat/chat.router.js');
var appConst = require('./config/config.js');
var db = require('./service/db.mongo.js');
var cookieParser = require('cookie-parser');

main.use(compression());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use(cookieParser());

//Routing
//main.use('/api/v1/chats/chat',chatRouter);


//Mongo connection
var appDB = db.getDBConnection();
appDB.on('error', console.error.bind(console, 'connection error:'));
appDB.once('open', function() {
    console.log("connnected with mongo");
});

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