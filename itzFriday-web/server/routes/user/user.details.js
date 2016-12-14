let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let UserDetails = new Schema({
 firstName: {type: String},
 lastName: {type: String},
 email: {type: String}
});

module.exports = mongoose.model('UserDetails', UserDetails);