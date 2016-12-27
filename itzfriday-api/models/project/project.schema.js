let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;
let projectDetails = new Schema({
	title:{type:String,required: true, unique: true},
	owner:{type:String},
	description:{type:String},
	status:{type:String}
});

projectDetails.methods.checkTitle = function(title) {
    return (title === this.title);
};
module.exports=mongoose.model('projectDetails',projectDetails);