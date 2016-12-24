let mongoose = require('mongoose');
mongoose.Promise= global.Promise;

let channelDetails = require('./../channel/channel.schema.js');
let Schema = mongoose.Schema;

let messageHistory = new Schema({
	channelID:{type:Schema.Type.ObjectId,ref:'channelDetails'},
	message:[{
		text:{type:String},
		sender:{type:String},
		time:{type:String}
	}]
});

module.exports=mongoose.modal('messageHistory',messageHistory);