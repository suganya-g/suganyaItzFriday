var request = require('superagent');
const inviteCollaborators = function (repo,authToken,collaborators,callback)
{
    if(!repo)
    {
        callback({error: true, type:"string", content: "Error: Repository Not Present"}, null);
        return
    }
    else if(!collaborators || collaborators.length === 0)
    {
        callback({error: true, type:"string", content: "Error: Collaborators Not Present"}, null);
        return
    }

    var uri = 'https://api.github.com/repos/'+repo+'/collaborators/';

    let owner = repo.split('/');
    if(owner[0] !== undefined)
    {
        owner = owner[0].trim();
    }

    for(let collaborator in collaborators)
    {
        if(collaborators[collaborator] === owner)
        {
            callback(null, {type:"string", content: "Can't send invite to the admin " + collaborators[collaborator]});
        }
        else
        {
            request.put(uri + collaborators[collaborator] + '?oauth_token='+authToken)
            .set('User-Agent',owner)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/vnd.github.swamp-thing-preview+json')
            .end(function(error,response)
            {
                if(error)
                {
                    if(error.renderToString().match(/Unprocessable/ig))
                        callback({type:"string", content: "Failed to send invitation to "+collaborators[collaborator]}, null);
                    else
                        callback({type:"string", content: error.toString()}, null);
                }
                else
                {
                    if(response.status === 201)
                    {
                        callback(null, {type:"string", content: collaborators[collaborator] + " has been invited as collaborator in project "+repo});
                    }
                    else
                        callback(null, {type:"string", content: "Failed to send invite to " + collaborators[collaborator]});
                }
            });
        }  
    }
    return
}
module.exports = inviteCollaborators;