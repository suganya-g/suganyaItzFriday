let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;	
let userProfile = new Schema({
	firstname:{type:String,required:true},
	lastname:{type:String},
	email:{type:String,required:true,index: { unique: true }},
	contact:{type:Number},
	avatar:{type:String},
	status:{type:String}
});

module.exports = mongoose.model('userProfile', userProfile);