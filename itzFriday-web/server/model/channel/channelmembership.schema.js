let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;

let channelMemberShip = new Schema({
	channelID:{type:Schema.Types.ObjectId},
	memberID:{type:Schema.Types.ObjectId}
});
module.exports=mongoose.model('channelMemberShip',channelMemberShip);
