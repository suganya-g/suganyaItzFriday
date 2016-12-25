let mongoose = require('mongoose');
let projectDetails = require('./project.schema.js');
let userProfile = require('./../userprofile/userprofile.schema.js');

mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;

let projectMemberShip = new Schema({
	projectID:{type:Schema.Types.ObjectId,ref: 'projectDetails'},
	memberID:{type:Schema.Types.ObjectId,ref:'userProfile'}
});
module.exports = mongoose.model('projectMembership',projectMembership);