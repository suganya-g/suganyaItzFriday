var request = require('superagent');
const commentOnIssue = function (repo,authToken,number,comment,callback)
{
    var jsonObj = {
        'body' : comment
    };
    
	if(!repo)
    {
        callback({type:"string", content: "Error: Repository Not Present"}, null);
        return
    }
    else if(!number)
    {
        callback({type:"string", content: "Error: Issue Number Not Present"}, null);
        return
    }
    else if(!comment)
    {
        callback({type:"string", content: "Error: Comment Body Not Present"}, null);
        return
    }

    let owner = repo.split('/');
    if(owner[0] !== undefined)
    {
        owner = owner[0].trim();
    }

	request.post('https://api.github.com/repos/'+repo+'/issues/'+number+'/comments?oauth_token='+authToken)
    .set('User-Agent',owner)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(jsonObj))
    .end(function(error,response){
        if(error)
        {
            callback({type:"string", content: error.toString()}, null);
            return
        }
        callback(null, {type:"string", content: "Your comment has been posted on issue "+number+"."});
        return;
    });
}
module.exports = commentOnIssue;