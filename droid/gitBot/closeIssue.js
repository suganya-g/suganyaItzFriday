var request = require('superagent');
const closeIssue = function (owner,repo,authToken,issueNumber,callback)
{
	var jsonObj = {
        'state' : 'closed'
    };

	request.patch('https://api.github.com/repos/'+owner+'/'+repo+'/issues/'+issueNumber+'?oauth_token='+authToken)
    .set('User-Agent',owner)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(jsonObj))
    .end(function(error,response){
        if(error)
        {
            callback(error, response);
            return
        }
        callback(null, response.body.number);
        return
    });
}
module.exports = closeIssue;