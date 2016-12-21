var request = require('superagent');
const commentOnIssue = function (json, callback)
{
	if(!json.repo)
    {
        callback({type:"string", content: "Error: Repository Not Present"}, null);
        return
    }
    else if(!json.number)
    {
        callback({type:"string", content: "Error: Issue Number Not Present"}, null);
        return
    }
    else if(!json.body)
    {
        callback({type:"string", content: "Error: Comment Body Not Present"}, null);
        return
    }

    var jsonObj = {
        'body' : json.body
    };

    let owner = json.repo.split('/');
    if(owner[0] !== undefined)
    {
        owner = owner[0].trim();
    }

	request.post('https://api.github.com/repos/'+json.repo+'/issues/'+json.number+'/comments?oauth_token='+json.authToken)
    .set('User-Agent',owner)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(jsonObj))
    .end(function(error,response){
        if(error)
        {
            callback({type:"string", content: error.toString()}, null);
            return
        }
        callback(null, {type:"string", content: "Your comment has been posted on issue "+json.number+"."});
    });
    return;
}
module.exports = commentOnIssue;