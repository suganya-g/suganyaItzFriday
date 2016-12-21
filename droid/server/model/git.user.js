let mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let Schema = mongoose.Schema;

let GitUser = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    gitAccess: { type: String }
});

GitUser.methods.checkGitAccess = function() {
    return (this.gitAccess === '' || this.gitAccess === null);
};

module.exports = mongoose.model('GitUser', GitUser);