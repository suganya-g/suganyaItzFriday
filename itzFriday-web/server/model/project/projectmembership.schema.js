let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;

let projectMemberShip = new Schema({
	projectID:{type:Schema.Types.ObjectId},
	memberID:{type:Schema.Types.ObjectId}
});

module.exports = mongoose.model('projectMembership',projectMemberShip);

