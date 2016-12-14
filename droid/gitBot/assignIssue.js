var request = require('superagent');
const assignIssue = function (owner,repo,authToken,issueNumber,assignees, callback)
{
    var jsonObj = {
        'assignees' : assignees
    };

	request.patch('https://api.github.com/repos/'+owner+'/'+repo+'/issues/'+issueNumber+'?oauth_token='+authToken)
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
    return
}
module.exports = assignIssue;