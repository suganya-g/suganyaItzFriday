var request = require('superagent');
const commentOnIssue = function (repo,authToken,number,comment,callback)
{
    var jsonObj = {
        'body' : comment
    };
    
	if(!repo)
    {
        callback({ofType:"string", withContent: "Error: Repository Not Present"}, null);
        return
    }
    else if(!number)
    {
        callback({ofType:"string", withContent: "Error: Issue Number Not Present"}, null);
        return
    }
    else if(!comment)
    {
        callback({ofType:"string", withContent: "Error: Comment Body Not Present"}, null);
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
            callback({ofType:"string", withContent: error.toString()}, null);
            return
        }
        callback(null, {ofType:"string", withContent: "Your comment has been posted on issue "+number+"."});
        return;
    });
}
module.exports = commentOnIssue;