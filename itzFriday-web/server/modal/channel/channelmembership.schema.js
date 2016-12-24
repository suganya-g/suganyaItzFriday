let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let channelDetails = require('./channel.schema.js');
let userprofile = require('./../userprofile/userprofile.schema.js');

let Schema = mongoose.Schema;

let channelMembership = new Schema({
	channelID:{type:Schema.Type.ObjectId,ref:'channelDetails'},
	memberID:{type:Schema.Type.ObjectId,ref:'userprofile'}
});
module.exports=mongoose.modal('channelMembership',channelMembership);
