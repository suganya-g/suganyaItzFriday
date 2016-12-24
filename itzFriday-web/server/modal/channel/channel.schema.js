let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let projectDetails = require('./../project/project.schema.js');

let Schema = mongoose.Schema;

let channelDetails = new Schema({
	title:{type:String,required:true},
	projectID:{type:Schema.Type.ObjectId,ref:'projectDetails'},
	owner:{type:String},
	messageType:{type:String}
});

module.exports = mongoose.modal('channelDetails',channelDetails);