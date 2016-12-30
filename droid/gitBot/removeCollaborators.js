var request = require('superagent');
const removeCollaborators = function (repo,authToken,collaborators,callback)
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
        request.delete(uri + collaborators[collaborator] + '?oauth_token='+authToken)
        .set('User-Agent',owner)
        .set('Content-Type', 'application/json')
        .end(function(error,response)
        {
            if(error)
            {
                if(error.toString().match(/Unprocessable/ig))
                    callback({type:"string", content: "Failed to remove "+collaborators[collaborator]}, null);
                else
                    callback({type:"string", content: error.toString()}, null);
            }
            else
            {
                if(response.status === 204)
                {
                    if(collaborators[collaborator] !== owner)
                        callback(null, {type:"string", content: collaborators[collaborator] + " has been removed from project "+repo});
                    else
                        callback(null, {type:"string", content: "Can't remove the owner " + collaborators[collaborator]});
                }
                else
                    callback(null, {type:"string", content: "Failed to remove " + collaborators[collaborator]});
            }
        });  
    }
    return
}
module.exports = removeCollaborators;