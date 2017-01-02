let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;
let CodeDetails = new Schema({
	email:{type:String,required: true,unique:true},
	code:{type:Number},
	verified:false
});

CodeDetails.methods.compareCode = function(code){
	return (code == this.code);
};
module.exports=mongoose.model('CodeDetails',CodeDetails);
