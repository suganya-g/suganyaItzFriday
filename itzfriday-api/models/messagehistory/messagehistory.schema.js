let mongoose = require('mongoose');
mongoose.Promise= global.Promise;

let channelDetails = require('./../channel/channel.schema.js');
let Schema = mongoose.Schema;

let messageHistory = new Schema({
	channelID:{type:Schema.Types.ObjectId,ref:'channelDetails'},
	message:[{
		text:{type:String},
		sender:{type:String},
		time:{type:String}
	}]
});

messageHistory.methods.checkDuplicateChannel = function(channelID) {
    return (channelID === this.channelID);
};

module.exports=mongoose.model('messageHistory',messageHistory);