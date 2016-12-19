var request = require('superagent');
const commentOnIssue = function (owner,repo,authToken,issueNumber,comment, callback)
{
	var jsonObj = {
        'body' : comment
    };

    if(!owner)
    {
        callback({type:"string", content: "Error: Owner Not Present"}, null);
        return
    }
    else if(!repo)
    {
        callback({type:"string", content: "Error: Repository Not Present"}, null);
        return
    }
    else if(!issueNumber)
    {
        callback({type:"string", content: "Error: Issue Number Not Present"}, null);
        return
    }
    else if(!comment)
    {
        callback({type:"string", content: "Error: Comment Body Not Present"}, null);
        return
    }

	request.post('https://api.github.com/repos/'+owner+'/'+repo+'/issues/'+issueNumber+'/comments?oauth_token='+authToken)
    .set('User-Agent',owner)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(jsonObj))
    .end(function(error,response){
        if(error)
        {
            callback({type:"string", content: error.toString()}, null);
            return
        }
        callback(null, {type:"string", content: "Your comment has been posted on issue "+issueNumber+"."});
    });
    return;
}
module.exports = commentOnIssue;