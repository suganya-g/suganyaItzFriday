var request = require('superagent');
const addCollaborators = function (repo,authToken,collaborators,callback)
{
    if(!repo)
    {
        callback({type:"string", content: "Error: Repository Not Present"}, null);
        return
    }
    else if(!collaborators || collaborators.length === 0)
    {
        callback({type:"string", content: "Error: Collaborators Not Present"}, null);
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
            callback(null, {type:"string", content: "Not processing for the owner " + collaborators[collaborator]});
        }
        else
        {
            request.put(uri + collaborators[collaborator] + '?oauth_token='+authToken)
            .set('User-Agent',owner)
            .set('Content-Type', 'application/json')
            .end(function(error,response)
            {
                if(error)
                {
                    if(error.toString().match(/Unprocessable/ig))
                        callback({type:"string", content: "Failed to add "+collaborators[collaborator]+" as collaborator"}, null);
                    else
                        callback({type:"string", content: error.toString()}, null);
                }
                else
                {
                    if(response.status === 204)
                    {
                        callback(null, {type:"string", content: collaborators[collaborator] + " has been added as collaborator in project "+repo});
                    }
                    else
                        callback(null, {type:"string", content: "Failed to add contributor " + collaborators[collaborator]});
                }
            });
        }
    }
    return
}
module.exports = addCollaborators;