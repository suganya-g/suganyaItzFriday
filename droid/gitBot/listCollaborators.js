var request = require('superagent');
const listCollaborators = function (repo,authToken,callback)
{
    if(!repo)
    {
        callback({ofType:"string", withContent: "Error: Repository Not Present"}, null);
        return
    }

    var uri = 'https://api.github.com/repos/'+repo+'/collaborators?oauth_token='+authToken;

    let owner = repo.split('/');
    if(owner[0] !== undefined)
    {
        owner = owner[0].trim();
    }

    let collaborators = [];

	request.get(uri)
    .set('User-Agent',owner)
    .set('Content-Type', 'application/json')
    .end(function(error,response){
        if(error)
        {
            callback({ofType:"string", withContent: error.toString()}, null);
            return
        }
        else
        {
            for(let index in response.body)
            {
                //fetch login attribute to get usernames
                collaborators.push(response.body[index].login);
            }

        }
        console.log(collaborators)
        callback(null, {ofType:"listItems", withContent: collaborators});
        return
    });
}
module.exports = listCollaborators;