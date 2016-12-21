var request = require('superagent');
const assignIssue = function (json, callback)
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
    else if(!json.assignees)
    {
        callback({type:"string", content: "Error: Assignees Not Present"}, null);
        return
    }

    var jsonObj = {
        'assignees' : json.assignees
    };

    let owner = json.repo.split('/');
    if(owner[0] !== undefined)
    {
        owner = owner[0].trim();
    }

	request.patch('https://api.github.com/repos/'+json.repo+'/issues/'+json.number+'?oauth_token='+json.authToken)
    .set('User-Agent',owner)
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(jsonObj))
    .end(function(error,response){
        if(error)
        {
            callback({type:"string", content: error.toString()}, null);
            return
        }
        callback(null, {type:"string", content: "Issue "+response.body.number+" has been assigned to : "+json.assignees});
    });
    return
}
module.exports = assignIssue;