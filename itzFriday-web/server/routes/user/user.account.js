let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;

let UserAccount = new Schema({
	fullName: {type: String},
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

UserAccount.methods.checkPassword = function(password) {
    return (password === this.password);
};

module.exports = mongoose.model('UserAccount', UserAccount);