var request = require('superagent');
const listIssues = function (owner,repo,authToken,issueNumber,callback)
{
    console.log(issueNumber);
    var uri = 'https://api.github.com/repos/'+owner+'/'+repo+'/issues';
    if(issueNumber !== '')
        uri = uri + '/'+issueNumber;

	request.get(uri + '?oauth_token='+authToken)
    .set('User-Agent',owner)
    .set('Content-Type', 'application/json')
    .end(function(error,response){
        if(error)
        {
            callback(error, error);
        }
        callback(null, response.body);
    });
}
module.exports = listIssues;