let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;

let userAccount = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    role: { type: String, required: true },
    gitAccess: { type: String }
});

userAccount.methods.checkPassword = function(password) {
    return (password === this.password);
};

userAccount.methods.checkGitAccess = function() {
    return (this.gitAccess === '' || this.gitAccess === null);
};

module.exports = mongoose.model('userAccount', userAccount);