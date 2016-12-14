var request = require('superagent');
const commentOnIssue = function (owner,repo,authToken,issueNumber,comment, callback)
{
	var jsonObj = {
        'body' : comment
    };

	request.post('https://api.github.com/repos/'+owner+'/'+repo+'/issues/'+issueNumber+'/comments?oauth_token='+authToken)
    .set('User-Agent',owner)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(jsonObj))
    .end(function(error,response){
        if(error)
        {
            callback(error,response);
            return
        }
        callback(null, response);
    });
    return;
}
module.exports = commentOnIssue;