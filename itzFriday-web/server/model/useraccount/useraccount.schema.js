let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var bcrypt=require('bcryptjs');

let Schema = mongoose.Schema;

let userAccount = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

userAccount.methods.generateHash=function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userAccount.methods.validatePassword=function(password){
    return bcrypt.compareSync(password,this.password);
}



// userAccount.methods.checkPassword = function(password) {
//     return (password === this.password);
// };


module.exports = mongoose.model('userAccount', userAccount);