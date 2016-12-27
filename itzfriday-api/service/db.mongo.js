var mongoose = require('mongoose');
var config = require('../config/config.js');

module.exports = {
	getDBConnection() {
		mongoose.connect(config.mongoURL);
		var db = mongoose.connection;
		return db;
	}
}