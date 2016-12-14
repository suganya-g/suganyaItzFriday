var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    compression = require('compression');
var main     = express();
var server = require('http').createServer(main);
var io = require('socket.io')(server, {'transports': ['websocket', 'polling']});
var socket = require('./sockets/socket.js');
var port = process.env.PORT || 3000;
var userAccount = require('./routes/user/user.router.js');
var expressJWT = require('express-jwt');
var jwt = require('jsonwebtoken');
var appConst = require('./config/config.js');
var db = require('./service/db.mongo.js');


main.use(compression());
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== 'production') {
  const logger = require('morgan');
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../webpack.config.js')
  const compiler = webpack(config)

  main.use(logger('dev'));
  main.use(webpackHotMiddleware(compiler))
  main.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }))
}

main.use(express.static(path.join(__dirname, '../client/assets/')));
main.use(express.static(path.join(__dirname, '../client')));

main.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//Routing
main.use('/api/auth/',userAccount);
main.use('/api',expressJWT({secret:appConst.jwtSecret}));

//Mongo connection
var appDB = db.getDBConnection();
appDB.on('error', console.error.bind(console, 'connection error:'));
appDB.once('open', function() {
    console.log("connnected with mongo");
});

//Socket middleware to authenticate socket connection
io.use(function(sockets, next) {
  if(sockets) {
    var token = sockets.handshake.query.token,
              decodedToken;
    try {
      decodedToken = jwt.verify(token, appConst.jwtSecret);
      console.log("token valid for user", decodedToken.name);
      sockets.connectedUser = decodedToken.name;
      sockets.emit('connected', sockets.connectedUser);
      next();
      } catch (err) {
        console.log(err);
        next(new Error("not valid token"));
        //socket.disconnect();
      }
    }
  });

io.on('connection', socket);

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