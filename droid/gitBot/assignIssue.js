var request = require('superagent');
const assignIssue = function (repo,authToken,number,assignees,callback)
{
    var jsonObj = {
        'assignees' : assignees
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
    else if(!assignees)
    {
        callback({ofType:"string", withContent: "Error: Assignees Not Present"}, null);
        return
    }

    let owner = repo.split('/');
    if(owner[0] !== undefined)
    {
        owner = owner[0].trim();
    }

	request.patch('https://api.github.com/repos/'+repo+'/issues/'+number+'?oauth_token='+authToken)
    .set('User-Agent',owner)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(jsonObj))
    .end(function(error,response){
        if(error)
        {
            callback({ofType:"string", withContent: error.toString()}, null);
            return
        }
        if(response.status === 200)
        {
            callback(null, {ofType:"string", withContent: "Issue "+response.body.number+" has been assigned to : "+assignees});
            return
        }
        else
        {
            callback(null, {ofType:"string", withContent: "Error: Failed to assign issue"});
            return
        }
    });
}
module.exports = assignIssue;