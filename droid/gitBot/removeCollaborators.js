var request = require('superagent');
const removeCollaborators = function (repo,authToken,collaborators,callback)
{
    if(!repo)
    {
        callback({ofType:"string", withContent: "Error: Repository Not Present"}, null);
        return
    }
    else if(!collaborators || collaborators.length === 0)
    {
        callback({ofType:"string", withContent: "Error: Collaborators Not Present"}, null);
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
            callback(null, {ofType:"string", withContent: "Can't remove the owner " + collaborators[collaborator]});
        }
        else
        {
            request.delete(uri + collaborators[collaborator] + '?oauth_token='+authToken)
            .set('User-Agent',owner)
            .set('Content-Type', 'application/json')
            .end(function(error,response)
            {
                if(error)
                {
                    if(error.toString().match(/Unprocessable/ig))
                        callback({ofType:"string", withContent: "Failed to remove "+collaborators[collaborator]}, null);
                    else
                        callback({ofType:"string", withContent: error.toString()}, null);
                }
                else
                {
                    if(response.status === 204)
                    {
                        callback(null, {ofType:"string", withContent: collaborators[collaborator] + " has been removed from project "+repo});
                    }
                    else
                        callback(null, {ofType:"string", withContent: "Failed to remove " + collaborators[collaborator]});
                }
            });
        }  
    }
    return
}
module.exports = removeCollaborators;