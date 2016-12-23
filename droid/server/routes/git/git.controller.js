var config = require('../../config/config.js');
const request = require('superagent');
//require('superagent-auth-bearer')(request);
//const jsonwebtoken = require('jsonwebtoken');

var gitAccount = require('./../../model/git.user.js');

/*function getUser(token, callback) {
  request
    .get('https://api.github.com/user')
    .set('User-Agent', config.USER_AGENT)
    .set('Accept', 'application/json')
    .authBearer(token)
    .end(function(err, response) {
      if(err) { callback(err); return; }
      callback(null, response.body);
      return;
    }
  );
}*/

module.exports = {
  access: function(email, callback) {
    var result = '';
    gitAccount.findOne({ username: email}, function(err, user) {
      if (err) {
        console.log(err)
        result = {
            message:'Not able to process your request due to error',
            exist: false
          };
          callback(err.toString(), null);
      }

      if(user) {
        if(user.checkGitAccess()){
          result = {
            message:'https://github.com/login/oauth/authorize?client_id=' + config.GITHUB_CLIENT_ID+'&state=' +email+'&scope=user%20public_repo',
            exist: false
          };
          callback(null, result);
        } else {
          result = {
            message:user.gitAccess,
            exist: true
          };
          callback(null, result);
        }
      } else {
        var gitAccountUser = new gitAccount({
          username: email,
          gitAccess: ''
        });
        gitAccountUser.save(function(err, user) {
          if(err){
            callback(err.toString(), null);
          }
            result = {
              message:'https://github.com/login/oauth/authorize?client_id=' + config.GITHUB_CLIENT_ID+'&state=' +email,
              exist: false
            };
            callback(null, result);
          })
        }
    })
  },
  complete: function(req, res) {
    const code = req.query.code;
    const email = req.query.state;
    request
      .get('https://github.com/login/oauth/access_token')
      .query({
        client_id: config.GITHUB_CLIENT_ID,
        client_secret: config.GITHUB_CLIENT_SECRET,
        code: code
      })
      .end(function(err0, response0) {
        if(err0) { res.status(500).json(err0); return; }
        const accessToken = response0.body.access_token;
        const tokenType = response0.body.token_type;
        console.log(tokenType);
        var gitUser = new gitAccount({
          username: email,
          gitAccess: accessToken
        })
        gitAccount.findOneAndUpdate({ username: email }, { $set: { gitAccess: accessToken } }, { new: true }, function(err, doc) {
          if(err) {
            console.log(err);
          }
          if(doc) {
            res.send("You are now authorised!! Please close this window and continue.")
          }

        });
      }
    );
  }
};