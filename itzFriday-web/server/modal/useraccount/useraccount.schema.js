let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;

let userAccount = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    role: { type: String, required: true }
});

userAccount.methods.checkPassword = function(password) {
    return (password === this.password);
};

module.exports = mongoose.model('userAccount', userAccount);